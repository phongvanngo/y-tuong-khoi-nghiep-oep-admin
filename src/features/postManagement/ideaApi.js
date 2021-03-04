import axiosClient from "../../app/AxiosClient";

function solveError(mess, dispatch) {
    if (window.confirm(mess + ', reload ?')) {

    }
}

const ideaApi = {
    postNewIdeaRequest: async (idea) => {
        const url = '/idea';
        return await axiosClient
            .post(url, idea)
            .then(response => {
                if (response === undefined) return {};
                return response;
            })
            .catch(error => {
                solveError('connection failed', null);
                return null;
            });

    },
    patchIdeaRequest: async (idea, id) => {
        const url = '/idea/' + id;
        return await axiosClient
            .patch(url, idea)
            .then(response => {
                if (response === undefined) return {};
                return response;
            })
            .catch(error => {
                solveError('connection failed', null);
                return null;
            });

    },
    getIdeaListRequest: async () => {
        const url = '/idea/statistic/all';
        return await axiosClient
            .get(url)
            .then(response => {
                return response;
            })
            .catch(error => {
                solveError('connection failed', null);
                return null;
            });
    },

    deleteIdeaRequest: async (id) => {
        const url = '/idea/' + id;
        return await axiosClient
            .delete(url)
            .then(response => {
                return response;
            })
            .catch(error => {
                // solveError('connection failed', null);
                return null;
            });

    },
    activeIdeaRequest: async (id) => {
        const url = '/idea/' + id;
        return await axiosClient
            .post(url)
            .then(response => {
                return response;
            })
            .catch(error => {
                // solveError('connection failed', null);
                return null;
            });

    },
}

export default ideaApi;