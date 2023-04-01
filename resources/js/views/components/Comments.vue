<template>
    <section class="comments">
        <div
            class="comment"
            v-for="comment in allComments.slice(
                3 * ($route.query.page - 1),
                3 * $route.query.page
            )"
            :key="comment.id"
        >
            <div class="info">
                <span>{{ comment.name }}</span
                ><span class="date">{{
                    new Date(+comment.date).toLocaleString()
                }}</span
                ><button @click="deleteComment(comment.id)">удалить</button>
            </div>
            {{ comment.text }}
        </div>
    </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: mapGetters(["allComments"]),
    methods: mapActions(["getComments", "deleteComment"]),
};
</script>
<style>
.comments {
    display: grid;
    grid-gap: 2vmin;
}
.comment {
    text-align: center;
    box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.2);
}
.info {
    display: flex;
    justify-content: space-between;
    box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.2);
}
.date {
    color: #aaa;
}
</style>
