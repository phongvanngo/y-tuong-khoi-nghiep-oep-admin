import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactPlayer from 'react-player/youtube'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '500px',
        // heigth: 'auto'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(0, 0, 0),
    },
}));

export default function TransitionsModal(props) {
    const classes = useStyles();

    const { isOpen, closeModal, linkVideo } = props;

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isOpen}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className={classes.paper}>
                    {/* <iframe id="inlineFrameExample"
                        title="Inline Frame Example"
                        width="600px"
                        height="400px"
                        src={linkVideo}>
                    </iframe> */}
                    <ReactPlayer controls="true" url={linkVideo} />
                </div>
            </Fade>
        </Modal>
    );
}