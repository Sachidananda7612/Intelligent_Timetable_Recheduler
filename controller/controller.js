const db=require('../config/db');


const getUser=async(req,res)=>{
    try{
        const data=await db.query('SELECT * FROM users WHERE Email=? and Password=? and role=?', [req.query.email,req.query.password,req.query.role]);
        // Simulate fetching user data from a database
      
        if(data[0].length==1){
           
            const dbData=data[0];
         const isAlreadyLoggedIn =  teacherAlreadyLoggedIn(dbData[0].email,new Date());
         if(isAlreadyLoggedIn){
            return res.status(200).send({
                success: true,
                isAlreadyLoggedIn: true
            })
        }
        updateTeacherLogin({body:{teacher_id:dbData[0].email,present:1,date:new Date()}});
            return res.status(200).send({
                success:true
         });
        }
        else{
            
           return res.status(200).send({
                success:false
            });
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({message:"Server Error"});
    } 
}


const updateTeacherLogin=async(req,res)=>{
    try{
        const data=await db.query('INSERT INTO teacherlogin(teacher_id,present,date) VALUES (?,?,?)', [req.body.teacher_id,req.body.present,formatDateForMySQL(req.body.date)]);
        // Simulate fetching user data from a database          
        console.log("Teacher login updated",data);
        return{message:"Success",  success:true};        
    } catch(error){
        console.log(error);
        return {message:"Server Error",  success:false};
    }
}

const formatDateForMySQL = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};


const teacherAlreadyLoggedIn=async(teacher_id,date)=>{
    try{
        const formattedDate = `${formatDateForMySQL(date).split(" ")[0]}%`;
        const data=await db.query('SELECT * FROM teacherlogin WHERE teacher_id=? and date LIKE ?', [teacher_id,formattedDate]);
        return data[0].length == 1;
    }
    catch(error){
        console.log(error);
        return false;
    } }                              

const getTimetable=async(req,res)=>{
    try{
     const data=await db.query('select * from timetable');
    return res.status(200).send({
      timetableData:data[0],
                success: true, })      
    } catch(error){
        console.log(error);
        return {message:"Server Error",  success:false};
    }
}

module.exports={getUser,getTimetable};

//  select * from timetable;