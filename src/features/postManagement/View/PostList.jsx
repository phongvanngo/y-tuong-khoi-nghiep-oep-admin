import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIdeasList } from '../ideaManagementSlice';
import PostItem from './PostItem';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { startLoading, stopLoading } from './../../../app/loadingSlice';

const useStyles = makeStyles((theme) => ({
    postListStyle: {
        width: '100%',
    },
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        maxHeight: '80vh',
    },
}));

function Copyright() {
    return (

        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: "50px" }}>
            {new Date().getFullYear()}
            {' '}
            {'POWERED BY '}
            <Link color="inherit" href="https://material-ui.com/">
                WEBDEV STUDIOS
      </Link>{'.'}

        </Typography>
    );
}

export default function PostList(props) {
    const classes = useStyles();
    const ideasManagement = useSelector(state => state.ideasManagement)
    const { ideasList } = ideasManagement;


    const [page, setPage] = React.useState(0);


    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [filterType, setFilterType] = React.useState(0);

    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (event, newValue) => {
        setFilterType(newValue);
    };

    useEffect(() => {
        dispatch(startLoading());
        dispatch(fetchIdeasList()).then(
            () => {
                dispatch(stopLoading());
            }
        );
    }, [dispatch]);

    function a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    let isTeamIdea = true;

    function filterIdeasList() {
        // let newIdeaList = ideasList.filter(function (idea) {
        //     switch (filterType) {
        //         case 0:
        //             return idea;
        //         case 1:
        //             if (idea.contacts !== null) {
        //                 return idea;
        //             }
        //             break;
        //         case 2:
        //             if (idea.contacts === null) {
        //                 return idea;
        //             }
        //             break;
        //         default:
        //             return null;
        //     }
        // });
        let newIdeaList = [];

        ideasList.forEach(element => {
            switch (filterType) {
                case 0:
                    if (element.isTeam === 1)
                        newIdeaList.push(element);

                    break;
                case 1:
                    if (element.isTeam === 1 && element.contacts !== null) {
                        newIdeaList.push(element);
                    }
                    break;
                case 2:
                    if (element.isTeam === 1 && element.contacts === null) {
                        newIdeaList.push(element);
                    }
                    break;
                // ý tưởng cá nhân đã xét duyệt
                case 3:
                    if (element.isTeam === 0) {
                        newIdeaList.push(element);
                    }
                    isTeamIdea = false;
                    break;

                default:
                    break;
            }
        });

        console.log(newIdeaList);
        return newIdeaList;
    }



    const filteredIdeas = filterIdeasList();

    return (
        <Fragment>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={filterType}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Tất cả ý tưởng" {...a11yProps(0)} />
                        <Tab label="Các ý tưởng được liên hệ" {...a11yProps(1)}>
                        </Tab>
                        <Tab label="Các ý tưởng chưa được liên hệ" {...a11yProps(2)}>
                        </Tab>
                        <Tab label="Các ý tưởng cá nhân" {...a11yProps(3)}>
                        </Tab>

                    </Tabs>
                </AppBar>
                <Paper className={classes.postListStyle}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: "4%" }}>Số thứ tự</TableCell>
                                    <TableCell style={{ width: "5%" }}>Avatar</TableCell>
                                    <TableCell style={{ width: "10%" }}>Tên nhóm</TableCell>
                                    <TableCell style={{ width: "30%" }}>Nội dung ý tưởng</TableCell>
                                    <TableCell style={{ width: "10%" }}>Loại ý tưởng</TableCell>
                                    <TableCell style={{ width: "5%" }}>Video</TableCell>
                                    <TableCell style={{ width: "10%" }}>Facebook nhóm trưởng</TableCell>
                                    <TableCell style={{ width: "4%" }}>Số lượt vote</TableCell>
                                    <TableCell style={{ width: "4%" }}>Số lượt liên hệ</TableCell>
                                    <TableCell style={{ width: "7%" }}>
                                        {isTeamIdea ? "" : "Tình trạng kiểm duyệt"}
                                    </TableCell>
                                    <TableCell style={{ width: "1%" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredIdeas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => {
                                    return <PostItem postDetail={post} index={index} key={index} />
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredIdeas.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <Copyright />
        </Fragment >
    );
}
