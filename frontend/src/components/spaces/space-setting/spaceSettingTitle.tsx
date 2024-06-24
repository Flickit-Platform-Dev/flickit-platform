import React, { useEffect } from "react";
import Title from "@common/TitleComponent";
import SupTitleBreadcrumb from "@/components/common/SupTitleBreadcrumb";
import { useParams } from "react-router-dom";

interface ISpaceTitle {
    spaceInfo: {
      assessmentsCount: number
      code: string
      editable: boolean
      id: number
      lastModificationTime: string
      membersCount: number
      title: string
  };
}

const SpaceSettingTitle = (props: any) => {
  const {spaceInfo} = props
  return (
    <Title
      backLink="/"
      wrapperProps={{
        sx: {
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "flex-end" },
        },
      }}
      sup={
        <SupTitleBreadcrumb
          routes={[
            {
              title: spaceInfo?.title,
            },
          ]}
          displayChip
          colorSetting="#004F83"
          bgColorSetting="#D0E4FF"
        />
      }
    ></Title>
  );
};

export default SpaceSettingTitle;
