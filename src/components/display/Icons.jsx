import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import DrawIcon from "@mui/icons-material/Draw";
import ConstructionIcon from "@mui/icons-material/Construction";
import GroupsIcon from "@mui/icons-material/Groups";
import CelebrationIcon from "@mui/icons-material/Celebration";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ListIcon from "@mui/icons-material/List";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import InfoIcon from "@mui/icons-material/Info";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FaceIcon from "@mui/icons-material/Face";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const Icons = ({ icon, size }) => {
  switch (icon) {
    case "menu":
      return <MenuIcon sx={{ fontSize: size }} />;
    case "check":
      return <CheckCircleOutlineIcon sx={{ fontSize: size }} />;
    case "arrow-up":
      return <KeyboardArrowUpIcon sx={{ fontSize: size }} />;
    case "arrow-down":
      return <KeyboardArrowDownIcon sx={{ fontSize: size }} />;
    case "editcalendar":
      return <EditCalendarIcon sx={{ fontSize: size }} />;
    case "wheretovote":
      return <WhereToVoteIcon sx={{ fontSize: size }} />;
    case "draw":
      return <DrawIcon sx={{ fontSize: size }} />;
    case "construction":
      return <ConstructionIcon sx={{ fontSize: size }} />;
    case "group":
      return <GroupsIcon sx={{ fontSize: size }} />;
    case "celebration":
      return <CelebrationIcon sx={{ fontSize: size }} />;
    case "delete":
      return <DeleteForeverIcon sx={{ fontSize: size }} />;
    case "archive":
      return <ArchiveIcon sx={{ fontSize: size }} />;
    case "edit":
      return <EditIcon sx={{ fontSize: size }} />;
    case "close":
      return <CloseIcon sx={{ fontSize: size }} />;
    case "add":
      return <AddIcon sx={{ fontSize: size }} />;
    case "view":
      return <VisibilityIcon sx={{ fontSize: size }} />;
    case "hide":
      return <VisibilityOffIcon sx={{ fontSize: size }} />;
    case "checklist":
      return <ChecklistRtlIcon sx={{ fontSize: size }} />;
    case "list":
      return <ListIcon sx={{ fontSize: size }} />;
    case "checkbook":
      return <RequestQuoteIcon sx={{ fontSize: size }} />;
    case "info":
      return <InfoIcon sx={{ fontSize: size }} />;
    case "wallet":
      return <AccountBalanceWalletIcon sx={{ fontSize: size }} />;
    case "back":
      return <ArrowBackIosNewIcon sx={{ fontSize: size }} />;
    case "split":
      return <CallSplitIcon sx={{ fontSize: size }} />;
    case "ap":
      return <AssignmentIcon sx={{ fontSize: size }} />;
    case "face":
      return <FaceIcon sx={{ fontSize: size }} />;
    case "logout":
      return <LogoutIcon sx={{ fontSize: size }} />;
    case "po":
      return <LocalShippingIcon sx={{ fontSize: size }} />;
    case "key":
      return <VpnKeyIcon sx={{ fontSize: size }} />;
    case "cancel":
      return <DoDisturbIcon sx={{ fontSize: size }} />;
    default:
      null;
  }
};

export default Icons;
