import React, { useEffect } from "react";
import { Trans } from "react-i18next";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { styles } from "@styles";
import { authActions, useAuthContext } from "@providers/AuthProvider";
import AppBar from "@mui/material/AppBar";
import { Box, ListItemIcon } from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import QueryData from "@common/QueryData";
import { useServiceContext } from "@providers/ServiceProvider";
import { useQuery } from "@utils/useQuery";
import { ISpacesModel } from "@types";
import CompareRoundedIcon from "@mui/icons-material/CompareRounded";
import keycloakService from "@/service//keycloakService";
const drawerWidth = 240;

const Navbar = () => {
  const { userInfo, dispatch } = useAuthContext();
  const { spaceId } = useParams();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { service } = useServiceContext();
  const spacesQueryData = useQuery<ISpacesModel>({
    service: (args, config) => service.fetchSpaces(args, config),
    toastError: true,
  });
  const fetchPathInfo = useQuery({
    service: (args, config) =>
      service.fetchPathInfo({ spaceId, ...(args || {}) }, config),
    runOnMount: false,
  });
  const fetchSpaceInfo = async () => {
    try {
      const res = await fetchPathInfo.query();
      dispatch(authActions.setCurrentSpace(res?.space));
    } catch (e) {}
  };
  useEffect(() => {
    if (spaceId) {
      fetchSpaceInfo();
    }
  }, [spaceId]);
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ pl: 1, pr: 1, textAlign: "center" }}
    >
      <Typography
        variant="h6"
        sx={{ my: 1, height: "40px", width: "100%", ...styles.centerVH }}
        component={NavLink}
        to={spaceId ? `/${spaceId}/assessments/1` : `/spaces`}
      >
        <NavLogo />
      </Typography>
      <Divider />
      <List dense>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "left", borderRadius: 1.5 }}
            component={NavLink}
            to="spaces"
          >
            <ListItemText primary={<Trans i18nKey="spaces" />} />
          </ListItemButton>
        </ListItem>
        {spaceId && (
          <QueryData
            {...spacesQueryData}
            render={(data) => {
              const { results } = data;
              return (
                <Box>
                  {results.slice(0, 5).map((space: any) => {
                    return (
                      <ListItem disablePadding key={space?.id}>
                        <ListItemButton
                          sx={{ textAlign: "left", borderRadius: 1.5 }}
                          component={NavLink}
                          to={`/${space?.id}/assessments/1`}
                        >
                          <ListItemText
                            primary={
                              <>
                                {space?.title && (
                                  <Typography
                                    variant="caption"
                                    textTransform={"none"}
                                    sx={{
                                      pl: 0.5,
                                      ml: 0.5,
                                      lineHeight: "1",
                                      borderLeft: (t) =>
                                        `1px solid ${t.palette.grey[300]}`,
                                    }}
                                  >
                                    {space?.title}
                                  </Typography>
                                )}
                              </>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                  <Divider />
                </Box>
              );
            }}
          />
        )}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "left", borderRadius: 1.5 }}
            component={NavLink}
            to={`/compare`}
          >
            <ListItemText primary={<Trans i18nKey="compare" />} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "left", borderRadius: 1.5 }}
            component={NavLink}
            to={`/assessment-kits`}
          >
            <ListItemText primary={<Trans i18nKey="assessmentKits" />} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        sx={{
          width: "calc(100% - 8px)",
          margin: "4px",
          borderRadius: "16px",
          background: "white",
        }}
        data-cy="nav-bar"
      >
        <Toolbar
          variant="dense"
          sx={{
            backgroundColor: (t) => t.palette.primary.main,

            borderRadius: 1,
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "none" },
              color: (t) => t.palette.primary.light,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={NavLink}
            sx={{
              display: {
                xs: "none",
                md: "block",
                color: "grey",
                height: "42px",
                width: "110px",
              },
            }}
            to={`/spaces`}
            
          >
            <NavLogo />
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" }, ml: 3 }}>
            <SpacesButton />
            <Button
              component={NavLink}
              to={`/compare`}
              startIcon={
                <CompareRoundedIcon
                  sx={{ opacity: 0.8, fontSize: "18px !important" }}
                />
              }
              sx={{
                ...styles.activeNavbarLink,
                ml: 0.1,
                mr: 0.8,
                color: (t) => t.palette.primary.light,
              }}
              size="small"
            >
              <Trans i18nKey="compare" />
            </Button>
            <Button
              component={NavLink}
              to={`/assessment-kits`}
              sx={{
                ...styles.activeNavbarLink,
                ml: 0.1,
                color: (t) => t.palette.primary.light,
              }}
              size="small"
              startIcon={
                <AssessmentRoundedIcon
                  sx={{ opacity: 0.8, fontSize: "18px !important" }}
                />
              }
            >
              <Trans i18nKey="assessmentKits" />
            </Button>
          </Box>
          <Box ml="auto">
            <AccountDropDownButton userInfo={userInfo} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={window.document.body}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

const NavLogo = () => {
  return (
   <svg width="100%" height="100%" viewBox="0 0 175 66" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1557_5336)">
<path d="M40.9957 27.2739V39.9179C40.9957 40.919 40.1878 41.7304 39.191 41.7304H17.5348C16.5381 41.7304 15.7301 40.919 15.7301 39.9179V18.0537C15.7301 17.0526 16.5271 16.2412 17.5238 16.2412C23.0901 16.2412 39.8216 16.2412 41.8981 16.2412L39.5579 10.875H15.7305C12.7403 10.875 10.3162 13.2989 10.3164 16.3021C10.3168 23.0144 10.3174 34.438 10.3169 41.677C10.3167 44.6762 12.7234 47.1017 15.7097 47.1068C22.4047 47.1181 33.8212 47.1333 41.0568 47.1195C44.0266 47.1139 46.4098 44.6938 46.4098 41.7111V20.973C45.733 22.5017 45.0563 23.396 40.9957 27.2739Z" fill="#EDFCFC"/>
<path d="M15.7301 20.2658C15.7301 19.4014 15.7301 18.658 15.7301 18.0537C15.7301 17.0526 16.5366 16.2412 17.5333 16.2412C22.4043 16.2412 35.8361 16.2412 41.4469 16.2412C41.4469 16.2412 31.2955 12.2165 16.5651 10.875H15.763C12.7729 10.875 10.3489 13.3095 10.3489 16.3125V20.2658H15.7301Z" fill="#EDFCFC"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M45.7808 14.7256C44.8069 12.5784 41.8981 10.875 39.6422 10.875C37.3864 10.875 15.7305 10.875 15.7305 10.875C30.6192 12.6637 41.2213 16.2412 41.2213 16.2412C41.9096 16.4361 42.1166 17.3148 41.5883 17.7988L40.6371 18.6701L30.5865 28.7652C30.4171 28.9353 30.1448 28.9428 29.9663 28.7822L27.5891 26.642C27.5064 26.5675 27.3991 26.5263 27.288 26.5263H20.9414C20.5311 26.5263 20.3346 27.0243 20.6408 27.2985C23.1518 29.5465 28.5966 34.2403 29.9666 35.42C30.1476 35.5758 30.4132 35.56 30.5799 35.389C34.7558 31.1035 40.0382 26.452 44.1739 22.1965C46.2523 20.058 47.0939 17.6194 45.7808 14.7256Z" fill="#EDFCFC"/>
<path d="M63.4122 42.3969H57.2383V15.2148H76.2741V20.6516H63.4122V27.0587H73.5301V32.4954H63.4122V42.3969Z" fill="#EDFCFC"/>
<path d="M87.5931 42.3969C86.0599 42.6553 84.6029 42.7848 83.2195 42.7848C81.8361 42.7848 80.6753 42.255 79.7388 41.1928C78.8008 40.1319 78.332 38.7215 78.332 36.9602V15.2148H84.3345V35.9895C84.3345 36.3786 84.4484 36.7021 84.6777 36.9602C84.906 37.2201 85.1919 37.3493 85.5345 37.3493H87.5931V42.3969Z" fill="#EDFCFC"/>
<path d="M97.5387 22.5933V42.397H91.5358V27.8352H88.9639V22.5933H97.5387Z" fill="#EDFCFC"/>
<path d="M117.089 42.0092C112.813 42.526 109.04 42.7849 105.771 42.7849C104.216 42.7849 102.97 42.2552 102.032 41.193C101.095 40.132 100.626 38.7216 100.626 36.9604V28.0293C100.626 26.0879 101.111 24.5679 102.084 23.4671C103.055 22.3665 104.399 21.8169 106.114 21.8169H117.089V27.0586H108C107.085 27.0586 106.628 27.5771 106.628 28.6121V36.1837C106.628 36.5725 106.742 36.8963 106.971 37.1554C107.199 37.414 107.486 37.5432 107.828 37.5432C109.887 37.5432 112.973 37.3494 117.089 36.9604L117.089 42.0092Z" fill="#EDFCFC"/>
<path d="M125.835 34.2425V42.3969H119.832V15.2148H125.835V28.9998H128.579L132.351 21.817H138.696L133.552 31.7188L138.696 42.3972H132.351L128.407 34.2427H125.835V34.2425Z" fill="#EDFCFC"/>
<path d="M147.956 22.5933V42.397H141.954V27.8352H139.382V22.5933H147.956Z" fill="#EDFCFC"/>
<path d="M164.077 42.397C161.859 42.6554 159.687 42.7848 157.56 42.7848C156.005 42.7848 154.759 42.2551 153.822 41.1929C152.884 40.1319 152.416 38.7215 152.416 36.9603V27.0585H150.357V21.8168H152.416L153.101 17.1567H158.418V21.8168H162.705V27.0585H158.418V35.9896C158.418 36.3787 158.532 36.7021 158.761 36.9603C158.989 37.2201 159.275 37.3493 159.618 37.3493H164.077V42.397Z" fill="#EDFCFC"/>
<path d="M97.4763 15.2983H91.4736V20.7351H97.4763V15.2983Z" fill="#D81E5B"/>
<path d="M148.007 15.2983H142.005V20.7351H148.007V15.2983Z" fill="#F9A03F"/>
</g>
<defs>
<filter id="filter0_d_1557_5336" x="0" y="0" width="174.394" height="66" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1557_5336"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1557_5336" result="shape"/>
</filter>
</defs>
</svg>
  );
};

const SpacesButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { dispatch } = useAuthContext();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMenueItem = (space: any) => {
    dispatch(authActions.setCurrentSpace(space));
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const { service } = useServiceContext();

  const spacesQueryData = useQuery<ISpacesModel>({
    service: (args, config) => service.fetchSpaces(args, config),
    toastError: true,
  });

  return (
    <>
      <Button
        data-cy="spaces"
        onClick={() => navigate("/spaces")}
        sx={{
          ...styles.activeNavbarLink,
          color: (t) => t.palette.primary.light,
          ml: 0.1,
          mr: 0.8,
          "&:hover .MuiButton-endIcon > div": {
            borderLeftColor: "#8080802b",
          },
        }}
        startIcon={
          <FolderRoundedIcon
            sx={{ opacity: 0.8, fontSize: "18px !important" }}
          />
        }
        size="small"
        endIcon={
          <Box
            sx={{
              minWidth: "8px",
              ml: 0.6,
              px: 0.2,
              borderLeft: "1px solid #80808000",
              transition: "border .1s ease",
              display: "flex",
            }}
            onClick={(e: any) => {
              e.stopPropagation();
              handleClick(e);
            }}
          >
            {open ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
          </Box>
        }
      >
        <Trans i18nKey={"spaces"} />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { left: "165px !important", minWidth: "260px" } }}
      >
        <QueryData
          {...spacesQueryData}
          render={(data) => {
            const { results } = data;
            return (
              <Box>
                <Typography
                  variant="subMedium"
                  sx={{ px: 1.2, py: 0.3, opacity: 0.8 }}
                >
                  <Trans i18nKey={"recentSpaces"} />
                </Typography>
                {results.slice(0, 5).map((space: any) => {
                  return (
                    <MenuItem
                      key={space?.id}
                      dense
                      component={NavLink}
                      to={`/${space?.id}/assessments/1`}
                      onClick={() => handleClickMenueItem(space)}
                    >
                      {space?.title}
                    </MenuItem>
                  );
                })}
                <Divider />
              </Box>
            );
          }}
        />
        <MenuItem
          dense
          onClick={handleClose}
          component={NavLink}
          to={`/spaces`}
        >
          <Trans i18nKey={"spaceDirectory"} />
        </MenuItem>
      </Menu>
    </>
  );
};

const AccountDropDownButton = ({ userInfo }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        data-cy="spaces"
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
        sx={{
          ...styles.activeNavbarLink,
          ml: 0.1,
          mr: 0.8,
          color: (t) => t.palette.primary.light,
        }}
        size="small"
        endIcon={
          open ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />
        }
      >
        <Avatar
          sx={{ width: 26, height: 26, mr: 1.3 }}
          alt={userInfo.display_name}
          src={userInfo.picture || ""}
        />
        {userInfo.display_name}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { minWidth: "180px" } }}
      >
        <MenuItem
          dense
          component={NavLink}
          to={`/user/account`}
          onClick={handleClose}
        >
          <ListItemIcon>
            <AccountBoxRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Trans i18nKey={"account"} />
          </ListItemText>
        </MenuItem>
        <MenuItem
          dense
          onClick={handleClose}
          component={NavLink}
          to={`/user/expert-groups`}
        >
          <ListItemIcon>
            <EngineeringIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {" "}
            <Trans i18nKey={"expertGroups"} />
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          dense
          onClick={() => {
            keycloakService.doLogout();
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {" "}
            <Trans i18nKey={"signOut"} />
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
