"use client";

import { SiteConfigContracts, siteConfig } from "@/config/site";
import { aiAppAbi } from "@/contracts/abi/ai-app";
import useError from "@/hooks/useError";
import useMetadataLoader from "@/hooks/useMetadataLoader";
import { AIAppMetadata } from "@/types/ai-app-metadata";
import { AIAppReview } from "@/types/ai-app-review";
import { IndexService } from "@ethsign/sp-sdk";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import EntityList from "./entity-list";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function AIAppDirectory(props: { contracts: SiteConfigContracts }) {
  const [aiApps, setAIApps] = useState<number[] | undefined>();

  const { data: nextTokenId } = useReadContract({
    address: props.contracts.aiApp,
    abi: aiAppAbi,
    functionName: "getNextTokenId",
    args: [],
    chainId: props.contracts.chain.id,
  });

  useEffect(() => {
    setAIApps(undefined);
    if (nextTokenId) {
      setAIApps(Array.from(Array(Number(nextTokenId)).keys()));
    }
  }, [nextTokenId]);

  return (
    <EntityList
      entities={aiApps}
      renderEntityCard={(aiApp, index) => (
        <AIAppCard key={index} aiApp={aiApp} contracts={props.contracts} />
      )}
      noEntitiesText={`No AI apps on ${props.contracts.chain.name} 😐`}
    />
  );
}

export function AIAppCard(props: {
  aiApp: string;
  contracts: SiteConfigContracts;
}) {
  const { handleError } = useError();
  const [reviews, setReviews] = useState<AIAppReview[] | undefined>();
  const [totalEvaluation, setTotalEvaluation] = useState(0);

  /**
   * Define metadata
   */
  const { data: aiAppMetadataUri, isFetched: isAiAppMetadataUriFetched } =
    useReadContract({
      address: props.contracts.aiApp,
      abi: aiAppAbi,
      functionName: "tokenURI",
      args: [BigInt(props.aiApp)],
      chainId: props.contracts.chain.id,
    });
  const { data: aiAppMetadata, isLoaded: isAiAppMetadataLoaded } =
    useMetadataLoader<AIAppMetadata>(aiAppMetadataUri);

  async function loadReviews() {
    try {
      const indexService = new IndexService("testnet");
      const attestations = await indexService.queryAttestationList({
        schemaId: siteConfig.attestations.schemaId,
        page: 1,
        mode: "offchain",
      });
      const reviews: AIAppReview[] = [];
      let totalEvaluation = 0;
      for (const attestation of attestations.rows) {
        const attestattionData = JSON.parse(attestation.data);
        if (
          attestattionData.chain === props.contracts.chain.id &&
          Number(attestattionData.product) === Number(props.aiApp)
        ) {
          reviews.push({
            author: attestation.attester as `0x${string}`,
            timestamp: Number(attestation.attestTimestamp),
            content: attestattionData.content,
            evaluation: attestattionData.evaluation,
          });
          totalEvaluation += attestattionData.evaluation;
        }
      }
      setReviews(reviews);
      setTotalEvaluation(totalEvaluation);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.aiApp]);

  if (!isAiAppMetadataUriFetched || !isAiAppMetadataLoaded) {
    return <Skeleton className="w-full h-4" />;
  }

  return (
    <div className="w-full flex flex-col items-center border rounded px-4 py-6">
      <div className="w-full flex flex-row gap-4">
        {/* Icon */}
        <div>
          <Avatar className="size-16">
            <AvatarImage src="" alt="Icon" />
            <AvatarFallback className="text-2xl bg-primary">
              {aiAppMetadata?.icon}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Content */}
        <div className="w-full flex flex-col items-start">
          <p className="text-xl font-bold">{aiAppMetadata?.label}</p>
          <p className="text-sm mt-2">{aiAppMetadata?.description}</p>
          <div className="flex flex-row items-center gap-4 mt-4">
            <Badge variant="secondary">{aiAppMetadata?.category}</Badge>
            {reviews && totalEvaluation > 0 && (
              <p className="text-sm">
                ⭐ {(totalEvaluation / reviews.length).toFixed(2)}{" "}
                <span className="text-muted-foreground">
                  — {reviews.length} review(s)
                </span>
              </p>
            )}
          </div>
          <Link href={`/ai-apps/${props.contracts.chain.id}/${props.aiApp}`}>
            <Button variant="default" size="sm" className="mt-6">
              Open
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
