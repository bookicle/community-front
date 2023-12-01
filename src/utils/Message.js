import { ElMessage} from "element-plus";
import  de  from 'element-plus/es/locale/lang/de';

const showMessage = (msg, callback, type) => {
    ElMessage({
        message: msg,
        type: type,
        duration: 2000,
        onClose: () => {
            if (callback) callback()
        }
    })
}

const message = {
    error:(msg, callback)=>{
        showMessage(msg, callback, 'error');
    },
    success:(msg, callback)=>{
        showMessage(msg, callback, 'success');
    },
    warning:(msg, callback)=>{
        showMessage(msg, callback, 'warning');
    },
    info:(msg, callback)=>{
        showMessage(msg, callback, 'info');
    }
}

export default message;
