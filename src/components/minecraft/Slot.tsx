import type { ImageMetadata } from "astro";

interface SlotProps {
  image?: string | ImageMetadata;
  completedImage?: string | ImageMetadata;
  completed?: boolean;
  quantity?: number;
}

const Slot = ({ image, completedImage, completed, quantity }: SlotProps) => {
  return (
    <div className="slot slot-border">
      {image && (
        <img
          src={typeof image == "string" ? image : image.src}
          alt="Item"
          className="w-full h-full object-contain rendering-pixelated"
        />
      )}

      {completedImage && completed && (
        <img
          src={typeof completedImage == "string" ? completedImage : completedImage.src}
          alt="Completed Image"
          className="w-full h-full object-contain rendering-pixelated absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black/50"
        />
      )}

      {quantity && quantity >= 1 && <span className="slot-quantity">{quantity}</span>}
    </div>
  );
};

export default Slot;
