module.exports = {

    //获得accessToken
    getAccessToken: "https://qyapi.weixin.qq.com/cgi-bin/gettoken",

    //通讯录
    contact: {

        //二次验证
        authSucc: "https://qyapi.weixin.qq.com/cgi-bin/user/authsucc",

        //通讯录部门
        department: {
            //创建部门
            create: "https://qyapi.weixin.qq.com/cgi-bin/department/create",
            //更新部门
            update: "https://qyapi.weixin.qq.com/cgi-bin/department/update",
            //删除部门
            remove: "https://qyapi.weixin.qq.com/cgi-bin/department/delete",
            //获取部门列表
            getDepartments: "https://qyapi.weixin.qq.com/cgi-bin/department/list"
        },

        //通讯录用户
        user : {
            //创建
            create : "https://qyapi.weixin.qq.com/cgi-bin/user/create",
            //更新
            update : "https://qyapi.weixin.qq.com/cgi-bin/user/update",
            //删除一个
            remove : "https://qyapi.weixin.qq.com/cgi-bin/user/delete",
            //批量删除
            removeBatch : "https://qyapi.weixin.qq.com/cgi-bin/user/batchdelete",
            //获取成员
            getUser   : "https://qyapi.weixin.qq.com/cgi-bin/user/get",

            //获取部门成员(基本)
            getUsersBaseByDepartment : "https://qyapi.weixin.qq.com/cgi-bin/user/simplelis",

            //获取详细部门成员
            getUsersByDepartment : "https://qyapi.weixin.qq.com/cgi-bin/user/list",

            //邀请关注
            invite : "https://qyapi.weixin.qq.com/cgi-bin/invite/send"
        },

        //管理标签
        tag : {
            create : "https://qyapi.weixin.qq.com/cgi-bin/tag/create",
            update : ""

        }
    }

    }
