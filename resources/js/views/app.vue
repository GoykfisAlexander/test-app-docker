<template>
    <section class="chat">
        <Sort />
        <Navigation />
        <Loader v-if="loading" class="loader" />
        <Comments v-else-if="allComments.length" />
        <p class="p" v-else>нет комментариев</p>
        <Form />
    </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "./components/Loader.vue";
import Comments from "./components/Comments.vue";
import Form from "./components/Form.vue";
import Navigation from "./components/ Navigation.vue";
import Sort from "./components/Sort.vue";
export default {
    computed: mapGetters(["allComments", "loading"]),

    methods: mapActions(["getComments", "sorted"]),
    async mounted() {
        await this.getComments();

        {
            this.sorted({
                sort: this.$route.query.sort,
                order: this.$route.query.order,
            });
        }
    },

    components: {
        Form,
        Loader,
        Comments,
        Navigation,
        Sort,
    },
    created() {
        this.$route.query.page ??
            this.$router.replace("/comments?page=1&sort=id&order=desc");
    },
};
</script>
<style>
.chat {
    display: grid;
    grid-gap: 5vmin;
    grid-template-rows: 0.2fr 0.2fr 1fr 1fr;
    width: 40%;
    min-width: min-content;
    height: 80%;
    box-shadow: none;
}
@media screen and (orientation: portrait) {
    .chat {
        width: 90%;
    }
}
.loader {
    margin: auto;
}
p {
    text-align: center;
}
.noActive {
    opacity: 0.4;
    cursor: not-allowed;
}
input,
button {
    border: none;
    border-radius: 1vmin;
    background: none;
    box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.2);
}
</style>
