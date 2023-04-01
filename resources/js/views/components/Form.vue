<template>
    <form @submit.prevent="submit">
        <input
            :class="{ red: nameClassRed }"
            name="name"
            type="text"
            v-model="name"
            :placeholder="namePlaceholder"
        />
        <input
            :class="{ red: textClassRed }"
            name="text"
            type="text"
            v-model="text"
            placeholder="введите текст"
        />
        <date-picker
            class="date"
            v-model="date"
            valueType="format"
        ></date-picker>
        <button type="submit">отправить</button>
    </form>
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { mapActions } from "vuex";

export default {
    components: { DatePicker },
    data() {
        return {
            name: null,
            text: null,
            date: new Date().toJSON().slice(0, 10),
            namePlaceholder: "введите имя",
            nameClassRed: false,
            textClassRed: false,
        };
    },
    methods: {
        ...mapActions(["postComment"]),
        submit() {
            if (!this.name || /[^a-zA-Zа-яА-Я\s]/.test(this.name)) {
                this.name = "";
                this.namePlaceholder =
                    "имя должно содержать только буквы и пробел";
                this.nameClassRed = true;
                return;
            }
            if (!this.text) {
                this.textClassRed = true;
                return;
            }
            this.postComment({
                name: this.name,
                text: this.text,
                date: new Date(
                    this.date &&
                        `${this.date}:${new Date().toLocaleTimeString()}`
                )
                    .getTime()
                    .toString(),
            });
            this.text = null;
            this.namePlaceholder = "введите имя";
            this.nameClassRed = false;
            this.textClassRed = false;
        },
    },
};
</script>
<style>
form {
    font-size: 2vw;
    height: min-content;
    display: grid;
    grid-template-areas: "name comment" "date comment" "text text";
}
input[name="name"] {
    grid-area: name;
}
.red::placeholder {
    color: red;
}
.date {
    width: 100%;
    grid-area: date;
}
input[name="text"] {
    grid-area: text;
}

button {
    grid-area: comment;
    cursor: pointer;
}
</style>
