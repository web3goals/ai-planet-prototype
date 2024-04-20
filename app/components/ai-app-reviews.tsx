import { SiteConfigContracts, siteConfig } from "@/config/site";
import useError from "@/hooks/useError";
import { AIAppReview } from "@/types/ai-app-review";
import { IndexService } from "@ethsign/sp-sdk";
import { useEffect, useState } from "react";
import EntityList from "./entity-list";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { addressToShortAddress } from "@/lib/converters";

export function AIAppReviews(props: {
  aiApp: string;
  contracts: SiteConfigContracts;
}) {
  const { handleError } = useError();
  const [reviews, setReviews] = useState<AIAppReview[] | undefined>();
  const [totalEvaluation, setTotalEvaluation] = useState(0);

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

  return (
    <div className="w-full flex flex-col gap-4">
      {reviews && totalEvaluation > 0 && (
        <p className="text-sm">
          ⭐ {(totalEvaluation / reviews.length).toFixed(2)}{" "}
          <span className="text-muted-foreground">
            — {reviews.length} review(s)
          </span>
        </p>
      )}
      <EntityList
        entities={reviews}
        renderEntityCard={(review, index) => (
          <AiAppReviewCard key={index} review={review} />
        )}
        noEntitiesText={`No reviews 😐`}
      />
    </div>
  );
}

function AiAppReviewCard(props: { review: AIAppReview }) {
  return (
    <div className="w-full flex flex-col items-center border rounded px-4 py-4">
      <div className="w-full flex flex-row gap-4">
        {/* Icon */}
        <div>
          <Avatar className="size-12">
            <AvatarImage src="" alt="Icon" />
            <AvatarFallback className="text-xs bg-secondary">
              {props.review.evaluation} ⭐
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Content */}
        <div className="w-full">
          <p className="text-sm font-bold">
            {addressToShortAddress(props.review.author)}
            <span className="font-normal text-muted-foreground">
              {" "}
              · {new Date(props.review.timestamp).toDateString()}
            </span>
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {props.review.content}
          </p>
        </div>
      </div>
    </div>
  );
}
