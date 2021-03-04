import { Grid, TableCell, TableRow } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import notifcation from './../../../Common/NotificationComponent';
import VideoContainer from "./../../../Common/VideoContainer";
import { deleteIdea, updateIdea, activeIdea, unActiveIdea } from './../ideaManagementSlice';
import { startLoading, stopLoading } from './../../../app/loadingSlice';
import ReactPlayer from 'react-player/youtube';
import Switch from '@material-ui/core/Switch';
const ITEM_HEIGHT = 48;

function PostItem({ postDetail, index }) {
    const dispatch = useDispatch();
    const { id, name, content, type, video, likes, contacts, manager, avatar, isTeam, status } = postDetail;
    const [openExpand, setOpenExpand] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [ideaEditDetail, setIdeaEditDetail] = React.useState({
        groupName: "",
        ideaContent: "",
        ideaVideo: "",
        ideaType: "",
        linkToManagerSocial: "",
        groupAvatar: "",
    })

    const [openModal, setOpenModal] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const Menu_DeletePost_Click = () => {
        if (window.confirm("Bạn có chắc chắn xóa")) {
            dispatch(deleteIdea(id));
            setAnchorEl(null);
        }
        else {

        }
    }

    const Menu_EditPost_Click = () => {
        setAnchorEl(null);
        setOpenExpand(!openExpand);

        setIdeaEditDetail({
            groupName: name,
            ideaContent: content,
            ideaVideo: video,
            ideaType: type,
            linkToManagerSocial: manager,
            groupAvatar: avatar,
            status: status,
            isTeam: isTeam === 1 ? true : false
        });
    }

    const Button_CancelEdit_Click = () => {
        setOpenExpand(!openExpand);

    }
    const Button_SaveEdit_Click = () => {
        // setOpenExpand(!openExpand);
        for (const atribute in ideaEditDetail) {
            if (atribute === 'groupAvatar') continue;
            if (atribute === 'isTeam') continue;
            if (atribute === 'status') continue;
            if (ideaEditDetail[atribute] === "" || ideaEditDetail[atribute] === null) {
                notifcation("danger", "Thêm ý tưởng thất bại", "Kiểm tra các trường dữ liệu bắc buộc");
                return;
            }
            console.log("don");
        }

        setOpenExpand(!openExpand);
        dispatch(updateIdea({ id: id, ideaDetail: ideaEditDetail }));

    }


    //phần xét duyệt
    var ideaStatus = status === 1 ? true : false;
    console.log(ideaStatus);

    const [isChecked, setIsChecked] = React.useState(ideaStatus);

    if (ideaStatus !== isChecked) setIsChecked(ideaStatus);

    const handleChange = (event) => {
        dispatch(startLoading());
        if (isChecked === true) {

            dispatch(unActiveIdea(id)).then(
                () => {
                    dispatch(stopLoading());
                }
            );
        }
        else {
            dispatch(activeIdea(id)).then(
                () => {
                    dispatch(stopLoading());
                }
            );;
        }
        // setIsChecked(!isChecked);

    };

    const ReviewSection = () => {
        if (isTeam === 0) {
            return (
                <Switch
                    checked={isChecked}
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            )
        }
    }
    //


    return (
        <Fragment>



            <TableRow>
                {/* <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpenExpand(!openExpand)}>
                        {openExpand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell> */}
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                    <Avatar src={avatar} />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{content}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>
                    {/* <iframe src={video} />
                     */}
                    <IconButton onClick={() => { setOpenModal(true) }}>
                        <PlayCircleOutlineIcon />
                    </IconButton>
                    <VideoContainer
                        isOpen={openModal}
                        openModal={() => setOpenModal(true)}
                        closeModal={() => setOpenModal(false)}
                        linkVideo={video}
                    />
                </TableCell>
                <TableCell>
                    <a rel="noreferrer" target="_blank" href={manager}>{manager}</a>
                </TableCell>
                <TableCell>{likes ? likes : "0"}</TableCell>
                <TableCell>{contacts ? contacts : "0"}</TableCell>
                {/* phần kiểm duyệt  */}
                <TableCell>{ReviewSection()}</TableCell>

                <TableCell>
                    <IconButton
                        aria-label="more"
                        aria-controls={id}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id={id}
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <MenuItem onClick={Menu_EditPost_Click}>
                            Sửa
                        </MenuItem>
                        <MenuItem onClick={Menu_DeletePost_Click}>
                            Xóa
                        </MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={openExpand} timeout="auto" unmountOnExit >
                        {/* <Box margin={1}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <TextField
                                        required
                                        id="address1"
                                        name="address1"
                                        label="Nội dung ý tưởng"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                        multiline
                                        rows={4}
                                        variant="filled"
                                    // value={ideaEditDetail.ideaContent}
                                    // onChange={(e) => {
                                    //     setIdeaEditDetail({ ...ideaEditDetail, ideaContent: e.target.value });
                                    // }}
                                    />
                                </Grid>
                            </Grid>
                        </Box> */}
                        <Box margin={2} >
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <TextField
                                            style={{ width: "100%", marginBottom: "10px" }}
                                            width="auto"
                                            id="outlined-basic"
                                            label="Tên nhóm"
                                            variant="outlined"
                                            value={ideaEditDetail.groupName}
                                            onChange={(e) => {
                                                setIdeaEditDetail({ ...ideaEditDetail, groupName: e.target.value });
                                            }}
                                        />
                                        <TextField
                                            style={{ width: "100%", marginBottom: "10px" }}
                                            width="auto"
                                            id="outlined-basic"
                                            label="Avatar nhóm"
                                            variant="outlined"
                                            value={ideaEditDetail.groupAvatar}
                                            onChange={(e) => {
                                                setIdeaEditDetail({ ...ideaEditDetail, groupAvatar: e.target.value });
                                            }}
                                        />
                                        <Avatar
                                            style={{ width: "150px", height: "150px" }}
                                            src={ideaEditDetail.groupAvatar} />

                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <TextField
                                            style={{ width: "100%", marginBottom: '10px' }}
                                            id="ideaType"
                                            label="Thể loại ý tưởng"
                                            variant="filled"
                                            value={ideaEditDetail.ideaType}
                                            onChange={(e) => {
                                                setIdeaEditDetail({ ...ideaEditDetail, ideaType: e.target.value });
                                            }}

                                        />
                                        <TextField
                                            style={{ width: "100%", marginBottom: '10px' }}
                                            id="filled-multiline-flexible"
                                            label="Nội dung ý tưởng"
                                            multiline
                                            variant="filled"
                                            value={ideaEditDetail.ideaContent}
                                            onChange={(e) => {
                                                setIdeaEditDetail({ ...ideaEditDetail, ideaContent: e.target.value });
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <TextField
                                            style={{ width: "100%", marginBottom: '10px' }}
                                            id="ideaType"
                                            label="Facebook nhóm trưởng"
                                            variant="outlined"
                                            value={ideaEditDetail.linkToManagerSocial}
                                            onChange={(e) => {
                                                setIdeaEditDetail({ ...ideaEditDetail, linkToManagerSocial: e.target.value });
                                            }}
                                        />
                                        <TextField
                                            style={{ width: "100%", marginBottom: '10px' }}
                                            id="filled-multiline-flexible"
                                            label="Link video"
                                            variant="outlined"
                                            value={ideaEditDetail.ideaVideo}
                                            onChange={(e) => {
                                                setIdeaEditDetail({ ...ideaEditDetail, ideaVideo: e.target.value });
                                            }}
                                        />
                                        <iframe id="inlineFrameExample"
                                            title="Inline Frame Example"
                                            // width="100%"
                                            src={ideaEditDetail.ideaVideo}
                                        >
                                        </iframe>
                                        {/* <ReactPlayer controls="true" url={ideaEditDetail.ideaVideo} /> */}
                                    </Grid>
                                </Grid>
                                <Grid item xs={1}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Button
                                            variant="contained"
                                            style={{ width: '100%', margin: "5px" }}
                                            onClick={Button_CancelEdit_Click}
                                        >
                                            Hủy</Button>
                                        <Button variant="contained" style={{ width: '100%', margin: "5px" }}
                                            onClick={Button_SaveEdit_Click}
                                            color="primary">
                                            Lưu
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default PostItem;