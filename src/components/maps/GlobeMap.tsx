import React, { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type CETPMarker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "Compliant" | "Warning" | "Breach";
};

interface GlobeMapProps {
  cetps: CETPMarker[];
  onSelect?: (id: string) => void;
}

const TOKEN_KEY = "mapbox_public_token";

const GlobeMap: React.FC<GlobeMapProps> = ({ cetps, onSelect }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
  );
  const [saving, setSaving] = useState(false);

  const center = useMemo(() => {
    if (!cetps?.length) return [78.9629, 22.5937] as [number, number]; // India-ish center fallback
    const avgLng = cetps.reduce((a, c) => a + c.lng, 0) / cetps.length;
    const avgLat = cetps.reduce((a, c) => a + c.lat, 0) / cetps.length;
    return [avgLng, avgLat] as [number, number];
  }, [cetps]);

  useEffect(() => {
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      projection: "globe",
      center,
      zoom: 3,
      pitch: 45,
    });

    // Controls
    mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
    mapRef.current.scrollZoom.disable();

    // Fog
    mapRef.current.on("style.load", () => {
      mapRef.current?.setFog({
        color: "#ffffff",
        "high-color": "#e0e0f0",
        "horizon-blend": 0.2,
      } as any);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [token, center]);

  // Render markers
  useEffect(() => {
    if (!mapRef.current) return;

    // clear existing
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    cetps.forEach((c) => {
      const el = document.createElement("div");
      const base = "w-3 h-3 rounded-full border shadow ring-1 ring-black/10";
      const statusClass =
        c.status === "Compliant"
          ? "bg-emerald-500 border-emerald-600"
          : c.status === "Warning"
          ? "bg-amber-500 border-amber-600"
          : "bg-destructive border-destructive"; // uses semantic token for destructive
      el.className = `${base} ${statusClass}`;
      el.style.cursor = "pointer";

      el.addEventListener("click", () => onSelect?.(c.id));

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([c.lng, c.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 12 }).setHTML(
            `<div style="font-family: ui-sans-serif, system-ui; font-size: 12px;"><strong>${c.name}</strong><br/>Status: ${c.status}</div>`
          )
        )
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [cetps, onSelect]);

  const handleSaveToken = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = String(formData.get("token") || "").trim();
    if (!value) return;
    setSaving(true);
    localStorage.setItem(TOKEN_KEY, value);
    setToken(value);
    setSaving(false);
  };

  if (!token) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mapbox token required</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Enter your Mapbox public token to view the geotagged CETPs map. You can find it in your Mapbox dashboard.
          </p>
          <form onSubmit={handleSaveToken} className="flex items-center gap-2">
            <Input name="token" placeholder="pk.********************************" aria-label="Mapbox public token" />
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[480px] rounded-lg overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
    </div>
  );
};

export default GlobeMap;
