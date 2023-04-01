import axios from "axios";

export default {
    actions: {
        async getComments({ commit, state }) {
            try {
                const res = await axios.get("/api/comments/");
                commit("updateComments", res.data);
            } catch (error) {
                console.log(error);
            } finally {
                state.loading = false;
            }
        },
        async postComment({ state }, comment) {
            state.loading = true;
            try {
                const res = await axios.post("/api/comments/", comment);
                state.comments.unshift(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                state.loading = false;
            }
        },
        async deleteComment({ state }, id) {
            state.loading = true;
            try {
                await axios.delete(`/api/comments/${id}`);
                state.comments = state.comments.filter(
                    (comment) => comment.id !== id
                );
            } catch (error) {
                console.log(error);
            } finally {
                state.loading = false;
            }
        },
        sorted({ state }, { sort, order }) {
            state.comments = state.comments.sort((a, b) => {
                a = a[sort];
                b = b[sort];
                return order === "desc" ? a - b : b - a;
            });
        },
    },
    mutations: {
        updateComments(state, comments) {
            state.comments = comments;
        },
    },
    state: {
        loading: true,
        comments: [],
        sort: null,
    },
    getters: {
        loading(state) {
            return state.loading;
        },
        allComments(state) {
            return state.comments;
        },
        pageComments(state) {
            return state.comments;
        },
    },
};
