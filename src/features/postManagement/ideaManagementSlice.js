import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notifcation from './../../Common/NotificationComponent';
import { fakeData } from './fakeData';
import ideaApi from './ideaApi';





export const addNewIdea = createAsyncThunk(
    'idea/postNewIdeaStatus',
    async (ideaDetail, thunkApi) => {
        ideaDetail = { ...ideaDetail, isTeam: true };
        const response = await ideaApi.postNewIdeaRequest(ideaDetail);
        return response;
    }
)

export const activeIdea = createAsyncThunk(
    'idea/activeIdea',
    async (id, thunkApi) => {
        const response = await ideaApi.activeIdeaRequest(id);
        return { response, idActivedIdea: id };
    }
)

export const unActiveIdea = createAsyncThunk(
    'idea/unActiveIdea',
    async (id, thunkApi) => {
        const response = await ideaApi.activeIdeaRequest(id);
        return { response, idActivedIdea: id };
    }
)

export const updateIdea = createAsyncThunk(
    'idea/updateNewIdeaStatus',
    async ({ id, ideaDetail }, thunkApi) => {
        const response = await ideaApi.patchIdeaRequest(ideaDetail, id);
        return { response, id, ideaDetail };
    }
)
export const fetchIdeasList = createAsyncThunk(
    'idea/fetchIdeaListStatus',
    async (thunkApi) => {

        const response = await ideaApi.getIdeaListRequest();

        return response;
    }
)

export const deleteIdea = createAsyncThunk(
    'idea/deleteIdeaListStatus',
    async (id, thunkApi) => {
        const response = await ideaApi.deleteIdeaRequest(id);
        return { response, idIdeaDeleted: id };
    }
)

export const ideasManagementSlice = createSlice({
    name: 'ideaManagement',
    initialState: {
        ideasList: []
    },
    reducers: {
        fetchIdeaListRequest: state => {
            state.posts = fakeData.PostList;
        },
    },

    extraReducers: {
        [addNewIdea.fulfilled]: (state, action) => {

            let response = action.payload;

            switch (response.status) {
                case 200:
                    notifcation("success", "Thêm ý tưởng thành công");
                    break;

                default:
                    notifcation("danger", "Thêm ý tưởng thất bại", "Kiểm tra các trường dữ liệu bắc buộc");
                    break;
            }
        },

        [updateIdea.fulfilled]: (state, action) => {
            const { id, ideaDetail, response } = action.payload;

            switch (response.status) {
                case 200:
                    let newIdeasList = [];
                    state.ideasList.forEach((idea) => {
                        if (idea.id !== id) {
                            newIdeasList.push(idea);
                        }
                        else {
                            let standardIdea = {
                                isTeam: ideaDetail.isTeam ? 1 : 0,
                                status: ideaDetail.status,
                                id: id,
                                name: ideaDetail.groupName,
                                content: ideaDetail.ideaContent,
                                type: ideaDetail.ideaType,
                                video: ideaDetail.ideaVideo,
                                manager: ideaDetail.linkToManagerSocial,
                                avatar: ideaDetail.groupAvatar,
                                likes: idea.likes,
                                contacts: idea.contacts


                            }
                            newIdeasList.push(standardIdea);
                        }
                    })
                    state.ideasList = newIdeasList;
                    notifcation("success", "Cập nhật ý tưởng thành công");
                    break;

                default:
                    notifcation("danger", "Cập nhật ý tưởng thất bại", "Cập nhật ý tưởng thất bại");
                    break;
            }
        },

        [fetchIdeasList.fulfilled]: (state, action) => {
            const response = action.payload;
            if (response != null)
                switch (response.status) {
                    case 200:
                        state.ideasList = response.data;
                        break;
                    default:
                        break;
                }
        },
        [deleteIdea.fulfilled]: (state, action) => {
            const { response } = action.payload;
            switch (response.status) {
                case 200:
                    const { idIdeaDeleted } = action.payload;
                    notifcation("success", "Xóa dữ liệu thành công");
                    let newIdeasList = [];
                    state.ideasList.forEach((idea) => {
                        if (idea.id !== idIdeaDeleted) {
                            newIdeasList.push(idea);
                        }
                    })

                    state.ideasList = newIdeasList;

                    break;
                default:
                    notifcation("success", "Xóa dữ liệu thất bại");

                    break;
            }
        },
        [activeIdea.fulfilled]: (state, action) => {
            const { response, idActivedIdea } = action.payload;
            if (response == null) {
                notifcation("danger", "Xét duyệt thất bại");
                return;
            }
            switch (response.status) {
                case 200:
                    const { idIdeaDeleted } = action.payload;
                    notifcation("success", "Xét duyệt thành công");
                    let newIdeasList = [];
                    state.ideasList.forEach((idea) => {
                        if (idea.id === idActivedIdea) {
                            idea.status = 1;
                            newIdeasList.push(idea);
                        }
                        else
                            newIdeasList.push(idea);
                    })

                    state.ideasList = newIdeasList;
                    console.log("cap nhat");

                    break;
                default:
                    notifcation("success", "Xét duyệt thất bại");

                    break;
            }
        },
        [unActiveIdea.fulfilled]: (state, action) => {
            const { response, idActivedIdea } = action.payload;
            if (response == null) {
                notifcation("danger", "Bỏ xét duyệt thất bại");
                return;
            }
            switch (response.status) {
                case 200:
                    const { idIdeaDeleted } = action.payload;
                    notifcation("success", "Bỏ xét duyệt thành công");
                    let newIdeasList = [];
                    state.ideasList.forEach((idea) => {
                        if (idea.id === idActivedIdea) {
                            idea.status = 0;
                            newIdeasList.push(idea);
                        }
                        else
                            newIdeasList.push(idea);
                    })

                    state.ideasList = newIdeasList;

                    break;
                default:
                    notifcation("danger", "Bỏ xét duyệt thất bại");

                    break;
            }
        }
    }
})

// export const { fetchIdeasListRequest } = ideasManagementSlice.actions;

const { reducer: ideasManagementReducer } = ideasManagementSlice;
export default ideasManagementReducer; 