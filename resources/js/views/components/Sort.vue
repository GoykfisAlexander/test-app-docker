<template>
    <section class="sort">
        <button
            name="id"
            v-bind:class="{ noActive: allComments.length < 2 }"
            @click="sortByNavigation"
        >
            сортировать по id
        </button>
        <button
            name="date"
            v-bind:class="{ noActive: allComments.length < 2 }"
            @click="sortByNavigation"
        >
            сортировать по дате
        </button>
    </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed: mapGetters(["allComments"]),
    methods: {
        ...mapActions(["sorted"]),
        pushQuery(query, value) {
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    [query]: value,
                },
            });
        },
        sortByNavigation({ target }) {
            if (target.name !== this.$route.query.sort) {
                if (this.$route.query.order !== "asc") {
                    this.pushQuery("order", "asc");
                }
            } else {
                if (this.$route.query.order !== "asc") {
                    this.pushQuery("order", "asc");
                } else {
                    this.pushQuery("order", "desc");
                }
            }

            if (target.name === "id") {
                if (this.$route.query.sort !== "id")
                    this.pushQuery("sort", "id");
            } else {
                if (this.$route.query.sort !== "date") {
                    this.pushQuery("sort", "date");
                }
            }

            this.sorted({
                sort: this.$route.query.sort,
                order: this.$route.query.order,
            });
        },
    },
};
</script>
<style>
.sort {
    display: flex;
    justify-content: space-evenly;
}
</style>
