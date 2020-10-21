
import store from "@/store";

export const permission = {
    inserted: function (el, binding) {
        const { value: pRoles } = binding
        const roles = store.getters && store.getters.roles
        if(pRoles && pRoles instanceof Array && pRoles.length > 0) {
            //判断用户角色中是否有按钮的角色
            const hasPermission = roles.some(role => pRoles.includes(role))

            //如果没有删除当前的DOM
            if(!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }else {
            throw new Error(`需要指定按钮要求角色数组，如v-role-button="['admin','editor']"`);
        }

    }
}