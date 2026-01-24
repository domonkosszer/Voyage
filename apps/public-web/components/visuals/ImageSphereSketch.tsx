"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ImageSphereThree() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      mountRef.current!.appendChild(canvas);

      const img = new Image();
      img.src = "/blog/visuals/bild.jpg";

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = "destination-out";
      };

      img.onload = resize;
      window.addEventListener("resize", resize);

      let drawing = false;

      const scratch = (x: number, y: number) => {
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();
      };

      const onMove = (e: MouseEvent) => {
        if (!drawing) return;
        scratch(e.clientX, e.clientY);
      };

      canvas.addEventListener("mousedown", () => (drawing = true));
      canvas.addEventListener("mouseup", () => (drawing = false));
      canvas.addEventListener("mousemove", onMove);

      img.onload = () => {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "destination-out";
      };

      return () => {
        window.removeEventListener("resize", resize);
        canvas.remove();
      };
    }, []);

    return (
      <div
        ref={mountRef}
        className="w-screen overflow-hidden cursor-crosshair"
      />
    );
}