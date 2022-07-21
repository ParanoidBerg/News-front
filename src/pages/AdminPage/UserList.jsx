import React, { useEffect, useState } from 'react';
import styles from './userList.module.css'
import { delUser, getUser } from "../../features/authSlice";
import { useDispatch, useSelector } from 'react-redux';

const UserList = () => {
    const users = useSelector((state)=>state.auth.users)
    const [text, setText] = useState("");

    const dispatch = useDispatch()
    
    function handleSetText(e) {
        setText(e.target.value);
      }

    useEffect(() => {
        dispatch(getUser());
      }, [dispatch]);

      const handleDel = (id) =>{
        dispatch(delUser(id))
      }
      const filtredUsers = users.filter(
        (item) => item.login.toLowerCase().indexOf(text.toLowerCase()) !== -1
      );
    return (
        <div>
           <div className={styles.main}>
           <input
                  onChange={handleSetText}
                  value={text}
                  className={styles.userSearch}
                  type="text"
                  placeholder="Поиск пользователей"
                />
            <hr className={styles.line} />
            {filtredUsers.map((el, index)=>{
                return(
                    <div key={el._id} className={styles.list}>
                        <div className={styles.num}>{index+1}</div>
                        <div className={styles.login}>{el.login}</div>
                        <div className={styles.id}>{el._id}</div>
                        <button onClick={() => handleDel(el._id)} className={styles.del}>X</button>
                    </div>
                )
            })}
           </div>
        </div>
    );
};

export default UserList;