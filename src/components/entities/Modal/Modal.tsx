"use client";

import React, { FC } from "react";
import { Fade, Modal } from "@mui/material";

interface ModalTaskProps {
  open: boolean
  setOpen: () => void
  className?: string
  children: React.ReactNode
}

const ModalDown: FC<ModalTaskProps> = ({  open, setOpen, children, className }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      onClose={setOpen}
      aria-describedby="modal-description"
      className="fixed flex size-full flex-col justify-end"
    >
      <Fade in={open} timeout={{ enter: 500, exit: 500 }}>
        <div className={`${open  ? "modal-slide-down" : 'modal-slide-down-close'} h-[70vh] w-full bg-red-700 bg-bg bg-cover ${className}`}>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export { ModalDown };
