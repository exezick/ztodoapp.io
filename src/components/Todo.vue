<template>
    <div class="mx-5">
        <v-card
            class="mx-auto my-10 pa-5 pt-2 elevation-3 transparentbg rounded-0"
            max-width="550"
            outlined
        >
            <v-card-title class="text-center">TODOs</v-card-title>

            <form @submit.prevent="addTodo">
                <v-text-field
                    v-model="todoEntry"
                    outlined
                    prepend-inner-icon="mdi-plus-thick"
                    placeholder="Add your new todo"
                    color="white"
                    background-color="purple lighten-1"
                    dark
                    class="rounded-0"
                />
            </form>

            <v-divider class="mt-n3 mb-6" />

            <div v-for="(todolist, index) in todolists"
                :key="index"
                class="item"
                :class="{'show': todolist.show}"
            >
                <v-alert
                    :id="index"
                    :color="todolist.complete ? 'green accent-4' : 'purple'"
                    border="left"
                    elevation="1"
                    colored-border
                    class="mt-n3 rounded-0 minheight"
                    transition="slide-x-transition"
                >
                    <v-btn
                        icon
                        class="float-left mr-5"
                        height="24"
                        width="24"
                    >
                        <v-icon color="purple" title="Mark as complete" v-if="!todolist.complete" @click="completeTodo(todolist)">mdi-checkbox-blank-circle-outline</v-icon>
                        <v-icon color="green accent-4" title="Uncheck" v-else>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>

                    <p class="maxwith">{{ todolist.todo }}</p>

                    <v-spacer></v-spacer>

                    <div class="float-right">
                        <v-btn
                            icon
                            class=""
                            height="24"
                            width="24"
                        >
                            <v-icon color="yellow accent-3" title="Remove importance" v-if="todolist.favorite" @click="todolist.favorite = !todolist.favorite">mdi-star</v-icon>
                            <v-icon color="purple" title="Mark as important" v-else @click="setFavoriteTodo(todolist)">mdi-star-outline</v-icon>
                        </v-btn>

                        <v-btn
                            icon
                            class="ml-2"
                            height="24"
                            width="24"
                            color="purple"
                            @click="removeTodo(todolist)"
                            title="Delete todo"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </div>
                </v-alert>
            </div>

            <div v-if="completedToDoList.length > 0">
                <v-divider class="mt-5" />

                <v-btn
                    @click="show = !show"
                    class="mt-3 rounded-0 pl-1 mb-8 mt-5"
                    color="purple"
                    elevation="0"
                    small
                    dark
                    text
                >
                    <v-icon>{{ show ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
                    Completed
                </v-btn>

                <v-expand-transition>
                    <div v-show="show">
                        
                        <div v-for="(todolist, index) in completedToDoList"
                            :key="index"
                            class="item"
                            :class="{'show': todolist.show}"
                        >
                            <v-alert
                                :id="index"
                                :color="todolist.complete ? 'green accent-4' : 'purple'"
                                border="left"
                                elevation="1"
                                colored-border
                                class="mt-n3 rounded-0 minheight"
                                transition="slide-x-transition"
                            >
                                <v-btn
                                    icon
                                    class="float-left mr-5"
                                    height="24"
                                    width="24"
                                >
                                    <v-icon color="purple" title="Mark as complete" v-if="!todolist.complete">mdi-checkbox-blank-circle-outline</v-icon>
                                    <v-icon color="green accent-4" title="Uncheck" v-else @click="uncompleteTodo(todolist)">mdi-checkbox-marked-circle</v-icon>
                                </v-btn>

                                <p class="maxwith text-decoration-line-through">{{ todolist.todo }}</p>

                                <v-spacer></v-spacer>
                                <div class="float-right">
                                    <v-icon  height="24" width="24" color="yellow accent-3" title="Remove importance" v-if="todolist.favorite">mdi-star</v-icon>
                                    <v-icon height="24" width="24" color="purple" title="Mark as important" v-else>mdi-star-outline</v-icon>
                                   
                                    <v-btn
                                        icon
                                        class="ml-2"
                                        height="24"
                                        width="24"
                                        color="purple"
                                        @click="removeCompletedTodo(todolist)"
                                        title="Delete todo"
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </div>
                            </v-alert>
                        </div>

                    </div>
                </v-expand-transition>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            todoEntry: '',
            borderColor: 'purple',
            entryFavorite: false,
            completedToDoList: [],
            showCompletedList: false,
            todolists: [
                {
                    id: 1,
                    todo: 'Create a to do list app',
                    favorite: this.entryFavorite,
                    complete: false,
                    show: true
                },
                {
                    id: 2,
                    todo: 'Sleep later',
                    favorite: this.entryFavorite,
                    complete: false,
                    show: true
                },
                {
                    id: 3,
                    todo: 'Play dota later',
                    favorite: this.entryFavorite,
                    complete: false,
                    show: true
                }
            ]
        }
    },
    methods: {
        addTodo() {
            if(this.todoEntry !== '') {
                let date = new Date;
                let newtodoEntry = {
                    id: date.getTime(),
                    todo: this.todoEntry,
                    favorite: this.entryFavorite,
                    complete: false,
                    show: false
                }
                
                if(newtodoEntry.favorite) {
                    // push new item on last position
                    this.todolists.push(newtodoEntry);
                    console.log('last possition');
                }
                else {
                    //push new item on first position
                    this.todolists.splice(0, 0, newtodoEntry);
                    console.log('first possition');
                }

                setTimeout(() => {
                    this.todolists.find(element => element.id === newtodoEntry.id).show = true;
                }, 10);
            }

            this.todoEntry = '';
            this.entryFavorite = false;
        },
        setFavoriteTodo(item) {
            item.favorite = !item.favorite;
            item.show = false;

            setTimeout(() => {
                let index = this.todolists.findIndex(element => element.id === item.id);
                this.todolists.splice(index, 1);
                this.todolists.splice(0, 0, item);
                item.show = true;
                this.borderColor = 'yellow accent-3';
            }, 500);
        },
        completeTodo(item) {
            item.complete = !item.complete;
            item.show = false;

            setTimeout(() => {
                this.completedToDoList.push(item);
                let index = this.todolists.findIndex(element => element.id === item.id);

                this.todolists.splice(index, 1);
                item.show = true;
            }, 500);
        },
        uncompleteTodo(item) {
            item.complete = !item.complete;
            item.show = false;

            setTimeout(() => {
                if(item.favorite) {
                    this.todolists.splice(0, 0, item);
                }
                else {
                    this.todolists.push(item);
                }

                let index = this.completedToDoList.findIndex(element => element.id === item.id);
                this.completedToDoList.splice(index, 1);
                item.show = true;
            }, 500);
        },
        removeTodo(item) {
            item.show = false;

            setTimeout(() => {
                let index = this.todolists.findIndex(element => element.id === item.id);
                this.todolists.splice(index, 1);
            }, 500);
        },
        removeCompletedTodo(item) {
            item.show = false;

            setTimeout(() => {
                let index = this.completedToDoList.findIndex(element => element.id === item.id);
                this.completedToDoList.splice(index, 1);
            }, 500);
        }
    }
}
</script>

<style lang="scss" scoped>
.transparentbg{
    background: rgba(252, 229, 255, 0.9) !important;
}

.maxwith{
    max-width: 70%;
    float: left;
}

.minheight{
    min-height: 50px !important;
    padding-bottom: 0px;
}

.item{
    opacity: 0;
    transition: all .5s linear;
}

.show {
    opacity: 1;
}
</style>