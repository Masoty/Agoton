"use client";

import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Fade, Modal } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Container from "@/components/shared/Container";

const InfoFriendIcon = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <InfoIcon
        className="text-[35px] absolute top-0 right-0 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        aria-labelledby="modal-title"
        onClose={() => setOpen(false)}
        aria-describedby="modal-description"
        className="fixed flex size-full flex-col justify-end"
      >
        <Fade in={open} timeout={{ enter: 500, exit: 500 }}>
          <div
            className={`${open ? "modal-slide-down" : "modal-slide-down-close"} h-[70vh] w-full bg-red-700 bg-bg bg-cover border-t flex border-t-amber-100 rounded-tl-[50px] rounded-tr-[50px]`}
          >
            <Container className='flex flex-col items-center my-auto gap-2'>
              <h1 className='text-2xl'>How it works</h1>
              <Timeline>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Share the link to the invitation <br /> Get a gift for each
                    friend
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Your friends are joining Agoton <br /> And they start
                    earning points
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                  </TimelineSeparator>
                  <TimelineContent>Get 5% from friends</TimelineContent>
                </TimelineItem>
              </Timeline>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default InfoFriendIcon;
