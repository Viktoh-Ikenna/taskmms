import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
    authorize(credentials) {
 
  
        // If no error and we have user data, return it
        if (credentials.username==="john" && credentials.password==="admin") {

          return {
            id:1,
            name:"john",
            email:"viktoh@gmail.com",

          }
        }
        // Return null if user data could not be retrieved
        return false
      }
    })
  ],
callbacks:{
  jwt:async({token,user})=>{
    if(user){
      token.id=user.id

    }
    return token;
  },
  session:async({ session, token })=>{
    if(token){
      session.id=token.id

    }
    return session;
  },
  

},
secret:"test",
jwt:{
  secret:"test",
  encryption:true
},
})