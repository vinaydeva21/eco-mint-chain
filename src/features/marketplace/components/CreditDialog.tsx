import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Credit } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  credit: Credit | null;
}

const typeVariant: Record<Exclude<Credit["type"], undefined>, "default" | "destructive" | "outline" | "secondary"> = {
  Carbon: "secondary",
  Water: "outline",
};

export default function CreditDialog({ open, onOpenChange, credit }: Props) {
  const { toast } = useToast();

  if (!credit) return null;

  const handleBuy = () => {
    // Placeholder for Stripe one-off payment via Supabase Edge Function
    // See docs in project Useful Context (stripe-implementation-one-time-payments)
    toast({ title: "Mock checkout", description: `Proceeding to buy 1 unit of ${credit.name} for $${credit.priceUsd}.` });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant={typeVariant[credit.type]}>{credit.type}</Badge>
            {credit.name}
          </DialogTitle>
          <DialogDescription>
            {credit.summary}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground">Issuer</div>
            <div className="text-foreground">{credit.issuer}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Region</div>
            <div className="text-foreground">{credit.region}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Vintage</div>
            <div className="text-foreground">{credit.vintage}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Methodology</div>
            <div className="text-foreground">{credit.methodology}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">SDGs</div>
            <div className="text-foreground">{credit.sdgs.join(", ")}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Rating</div>
            <div className="text-foreground">{credit.rating.toFixed(1)} / 5</div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between gap-2">
          <div className="text-2xl font-semibold">${credit.priceUsd}</div>
          <Button onClick={handleBuy} disabled={credit.available < 1}>Buy now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
