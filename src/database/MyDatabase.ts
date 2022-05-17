/*
*  an easy database demo just to let the project run
*   then  mysql or redis will be used
* */
export  default  class MyDatabase{
    static db : Map<string,string> ;

    static createMyDb():string{
        if (this.db !=null){
            return "A database has been created now!"
        }
        this.db=new Map<string,string>()
        return "created successfully"
    }
    static registerUser(name:string,password:string):string{
        if (this.db.has(name)){
            return "A user called"+ name +"has been created!"
        }
        this.db.set(name,password)
        return "registered successfully"
    }
    static loginUser(name:string,password:string):string{
        if(!this.db.has(name)|| this.db[name]!=password){
            return "fail to login!"
        }
        return "login successfully"
    }
}