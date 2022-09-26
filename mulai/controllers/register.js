const db = require('../routes/db.config');
const bcrypt = require('bcryptjs');

const register = async(req, res) => {
    const{ email, password: Npassword } = req.body
    if (!email || !Npassword) return res.json({ status:"error", error:"Tolong  Masukan Email dan Password Anda "});
    else {
        
        db.query('SELECT email FROM users WHERE email = ?',[email],async (err, results) => {

            if(err) throw err;
            if(results[0]) {return res.json
            
            ({ status:"error", error:"Email dan Password Sudah Terdaftar"});
            }
            else {
            const password = await bcrypt.hash(Npassword, 8);
            console.log(password)

            db.query('INSERT INTO users SET ?',{email:email,password:password},(error,results)=>{
                if(error) throw error;
                return res.json({ status:"success", success: "Anda Berhasil Terdaftar"})
            })
            }
        })
      
    }


}

module.exports = register;