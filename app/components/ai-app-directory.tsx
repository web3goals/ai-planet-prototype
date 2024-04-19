"use client";

import { SiteConfigContracts } from "@/config/site";
import { aiAppAbi } from "@/contracts/abi/ai-app";
import useMetadataLoader from "@/hooks/useMetadataLoader";
import { AIAppMetadata } from "@/types/ai-app-metadata";
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
      setAIApps(Array.from(Array(nextTokenId).keys()));
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
          <Badge variant="secondary" className="mt-2">
            {aiAppMetadata?.category}
          </Badge>
          <Link href={`/ai-apps/${props.contracts.chain.id}/${props.aiApp}`}>
            <Button variant="default" size="sm" className="mt-4">
              Open
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
