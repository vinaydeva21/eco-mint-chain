import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Credit } from "../types";

interface Props {
  credit: Credit;
  onView: (c: Credit) => void;
}

const typeVariant: Record<Credit["type"], "default" | "destructive" | "outline" | "secondary"> = {
  Carbon: "secondary",
  Water: "outline",
};

export default function CreditCard({ credit, onView }: Props) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Badge variant={typeVariant[credit.type]}>{credit.type}</Badge>
          {credit.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2">
        <div className="flex items-center justify-between">
          <span>Issuer</span>
          <span className="text-foreground font-medium">{credit.issuer}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Region</span>
          <span className="text-foreground">{credit.region}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Vintage</span>
          <span className="text-foreground">{credit.vintage}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Available</span>
          <span className="text-foreground">{credit.available.toLocaleString()}</span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between">
        <div className="text-2xl font-semibold">${credit.priceUsd}</div>
        <Button onClick={() => onView(credit)} size="sm">View & Buy</Button>
      </CardFooter>
    </Card>
  );
}
