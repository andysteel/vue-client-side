<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card"/>
            <form name="form" @submit.prevent="handleRegister">
                <div class="form-group">
                    <label for="name"> Full Name</label>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input type="text" class="form-control"
                            name="name" v-model="user.name"/>
                        <span>{{ errors[0] }}</span>
                    </validation-provider>
                    <div class="alert alert-danger" role="alert"
                        v-if="errors.has('name')">
                        Full Name is required.    
                    </div>
                </div>
                <div class="form-group">
                    <label for="username">Username</label>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input type="text" class="form-control"
                            name="username" v-model="user.username"/>
                        <span>{{ errors[0] }}</span>
                    </validation-provider>
                    <div class="alert alert-danger" role="alert"
                        v-if="errors.has('username')">
                        Username is required.    
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input type="password" class="form-control"
                            name="password" v-model="user.password"/>
                        <span>{{ errors[0] }}</span>
                     </validation-provider>        
                    <div class="alert alert-danger" role="alert"
                        v-if="errors.has('password')">
                        Password is required.    
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block"
                        :disabled="loading">
                        <span class="spinner-border spinner-border-sm" 
                            v-show="loading"></span>
                        <span>Sign up</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user-service'
import {User} from '../models/user'

export default {
    name: 'register',
    data() {
        return {
            user: new User('','',''),
            loading: false
        }
    },
    mounted() {
        if(UserService.currentUserValue) {
            this.$router.push('/profile');
        }
    },
    methods : {
        handleRegister() {
            this.loading = true;
            this.$validator.validateAll();
            if(this.errors.any()) {
                this.loading = false;
                return;
            }

            UserService.register(this.user).then(
                data => {
                    //You can get warning, if you don't use paremeters.
                    console.log(data);
                    this.$store.dispatch("success", "Mission is completed.");
                    setTimeout(() => {
                        this.$router.push("/login");
                    }, 1000);
                },
                error => {
                    if (!error.response) {
                        this.$store.dispatch("error", error);
                    } else if (error.response.status === 409) {
                        this.$store.dispatch("error", "Username is not valid.");
                    } else {
                        this.$store.dispatch("error", "Unexpected error occurred.");
                    }
                }
            ).then(() => {
                this.loading = false;
            });
        }
    }
}
</script>

//scoped css will only effective this page
<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  /* just in case there no content*/
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  /* shadows and rounded borders */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>