import type { RefObject } from "react";

export const draggableScroll = (
  ref: RefObject<HTMLElement | null>,
  options: {
    direction?: "vertical" | "horizontal" | "both";
  } = { direction: "both" },
) => {
  const { direction } = options;

  let initialPosition = {
    scrollTop: 0,
    scrollLeft: 0,
    mouseX: 0,
    mouseY: 0,
  };

  const mouseMoveHandler = (event: MouseEvent) => {
    if (!ref.current) return;

    const dx = event.clientX - initialPosition.mouseX;
    const dy = event.clientY - initialPosition.mouseY;

    if (direction === "horizontal" || direction === "both") {
      ref.current.scrollLeft = initialPosition.scrollLeft - dx;
    }

    if (direction === "vertical" || direction === "both") {
      ref.current.scrollTop = initialPosition.scrollTop - dy;
    }
  };

  const mouseUpHandler = () => {
    if (ref.current) {
      ref.current.style.cursor = "grab";
      ref.current.style.removeProperty("user-select");
    }

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  const onMouseDown = (event: { clientX: number; clientY: number }) => {
    if (!ref.current) return;

    initialPosition = {
      scrollLeft: ref.current.scrollLeft,
      scrollTop: ref.current.scrollTop,
      mouseX: event.clientX,
      mouseY: event.clientY,
    };

    ref.current.style.cursor = "grabbing";
    ref.current.style.userSelect = "none";

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  return { onMouseDown };
};