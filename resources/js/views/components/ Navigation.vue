<template>
    <section class="navigation">
        <button
            v-bind:class="{ noActive: $route.query.page == 1 }"
            @click="decrementPage"
        >
            предыдущая страница
        </button>
        <span>страница <br />{{ $route.query.page }}</span>
        <button
            v-bind:class="{
                noActive:
                    $route.query.page >= Math.ceil(allComments.length / 3),
            }"
            @click="incrementPage"
        >
            следующая страница
        </button>
    </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: mapGetters(["allComments"]),
    methods: {
        pushQuery(query, value) {
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    [query]: value,
                },
            });
        },
        incrementPage() {
            const page = +this.$route.query.page;
            if (page < Math.ceil(this.allComments.length / 3)) {
                this.pushQuery("page", (page + 1).toString());
            }
        },
        decrementPage() {
            const page = +this.$route.query.page;
            if (page > 1) {
                this.pushQuery("page", (page - 1).toString());
            }
        },
    },
    watch: {
        allComments(newValue) {
            const page = +this.$route.query.page;
            if (page > Math.ceil(newValue.length / 3) && page !== 1) {
                this.pushQuery("page", (page - 1).toString());
            }
        },
    },
};
</script>
<style>
.navigation {
    display: flex;
    justify-content: space-between;
}
span {
    text-align: center;
}
</style>
