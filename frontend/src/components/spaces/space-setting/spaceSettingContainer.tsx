import React, {useEffect, useState} from "react";
import QueryBatchData from "@common/QueryBatchData";
import {useQuery} from "@utils/useQuery";
import {useServiceContext} from "@providers/ServiceProvider";
import {useLocation, useParams} from "react-router-dom";
import LoadingSkeletonOfAssessmentRoles from "@common/loadings/LoadingSkeletonOfAssessmentRoles";
import {Trans} from "react-i18next";
import {styles} from "@styles";
import {IMemberModel, ISpaceModel, RolesType} from "@types";
import {
    SpaceSettingGeneralBox,
    SpaceSettingMemberBox
} from "./spaceSettingBox";

import {Typography} from "@mui/material";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddMemberDialog from "@components/assessment-setting/addMemberDialog";
import ConfirmRemoveMemberDialog from "@components/assessment-setting/confirmRemoveMemberDialog";
import SpaceSettingTitle from "./spaceSettingTitle";

const SpaceSettingContainer = () => {
    const {service} = useServiceContext();
    const { spaceId = "" } = useParams();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [expandedRemoveModal, setExpandedRemoveModal] = useState<{display: boolean,name: string, id: string}>({display:false,name:"", id:""});
    const [listOfMember,setListOfMember] = useState([])
    const [listOfInviteed,setListOfInviteed] = useState([])
    const [changeData,setChangeData] = useState(false)


    const fetchSpace = useQuery<ISpaceModel>({
        service: (args, config) => service.fetchSpace({ spaceId }, config),
    });

    const spaceMembersQueryData = useQuery<IMemberModel>({
        service: (args, config) => service.fetchSpaceMembers({ spaceId }, config),
    });

    const spaceMembersInviteeQueryData = useQuery<IMemberModel>({
        service: (args, config) =>
            service.fetchSpaceMembersInvitees({ spaceId }, config),
    });

    useEffect(()=>{
     (
         async ()=>{
             const {items : MemberItems} = await spaceMembersQueryData.query()
             const {items : InviteedItems} = await spaceMembersInviteeQueryData.query()
             setListOfMember(MemberItems)
             setListOfInviteed(InviteedItems)
         }
     )()
    },[changeData])


    const handleClickOpen = () => {
        setExpanded(true);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    const handleOpenRemoveModal = (name: string, id: string) =>{
        setExpandedRemoveModal({display: true,name , id})
    }
    const handleCloseRemoveModal = () =>{
        setExpandedRemoveModal({display: false, name:"", id :""})
    }

    return (
        <QueryBatchData
            queryBatchData={[
                fetchSpace,
            ]}
            renderLoading={() => <LoadingSkeletonOfAssessmentRoles/>}
            render={([spaceInfo]) => {
                const {title} = spaceInfo
                return (
                    <Box m="auto" pb={3} sx={{px: {lg: 14, xs: 2, sm: 3}}}>
                        <SpaceSettingTitle
                            spaceInfo = {spaceInfo}
                        />
                        <Grid container columns={12} mt={3} mb={5}>
                            <Grid item sm={12} xs={12}>
                                <Box
                                    sx={{...styles.centerCVH}}
                                    gap={2}
                                    textAlign="center"
                                >
                                    <Typography color="#004F83"
                                                sx={{fontSize:{xs:"2.125rem",sm:"3.5rem"}}} fontWeight={900}>
                                        <Trans i18nKey="spaceSettings"/>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container columns={12} mb={"32px"}>
                            <Grid item sm={12} xs={12}>
                                <SpaceSettingGeneralBox
                                    AssessmentTitle={title}
                                    fetchPathInfo={fetchSpace.query}
                                />
                            </Grid>
                        </Grid>
                        <Grid container columns={12}>
                            <Grid item sm={12} xs={12}>
                                <SpaceSettingMemberBox
                                    listOfMember={listOfMember}
                                    listOfInviteed={listOfInviteed}
                                    // fetchAssessmentsUserListRoles={fetchAssessmentsUserListRoles.query}
                                    openModal={handleClickOpen}
                                    openRemoveModal={ handleOpenRemoveModal}
                                    setChangeData={setChangeData}
                                />
                            </Grid>
                        </Grid>
                        {/*<AddMemberDialog*/}
                        {/*    expanded={expanded}*/}
                        {/*    onClose={handleClose}*/}
                        {/*    listOfUser={listOfUser}*/}
                        {/*    assessmentId={assessmentId}*/}
                        {/*    // fetchAssessmentsUserListRoles={fetchAssessmentsUserListRoles.query}*/}
                        {/*    title={<Trans i18nKey={"addNewMember"}/>}*/}
                        {/*    cancelText={<Trans i18nKey={"cancel"}/>}*/}
                        {/*    confirmText={<Trans i18nKey={"addToThisAssessment"}/>}*/}
                        {/*    setChangeData={setChangeData}*/}
                        {/*/>*/}
                        {/*<ConfirmRemoveMemberDialog*/}
                        {/*    expandedRemoveDialog={expandedRemoveModal}*/}
                        {/*    onCloseRemoveDialog={handleCloseRemoveModal}*/}
                        {/*    assessmentId={assessmentId}*/}
                        {/*    // fetchAssessmentsUserListRoles={fetchAssessmentsUserListRoles.query}*/}
                        {/*    assessmentName ={title}*/}
                        {/*    setChangeData={setChangeData}*/}
                        {/*/>*/}
                    </Box>
                );
            }}
        />
    )
}

export default SpaceSettingContainer