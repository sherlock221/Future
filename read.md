
access_token 续期

正常情况下AccessToken有效期为7200秒(2小时)，
有效期内重复获取返回相同结果； 有效期内有接口交互（包括获取AccessToken的接口），会自动续期。







access_token

当你获取到AccessToken时，你的应用就可以成功调用企业号后台所提供的各种接口以管理或访问企业号后台的资源或给企业号成员发消息。

为了防止企业应用的程序错误而引发企业号服务器负载异常，默认情况下，每个企业号调用接口都有一定的频率限制，当超过此限制时，调用对应接口会收到相应错误码。

以下是当前默认的频率限制，企业号后台可能会根据运营情况调整此阈值：

基础频率
每企业调用单个cgi/api不可超过1000次/分，30000次/小时

每ip调用单个cgi/api不可超过2000次/分，60000次/小时

发消息频率
每企业不可超过帐号上限数*30人次/天

创建帐号频率
每企业创建帐号数不可超过帐号上限数*3/月

创建应用频率
每企业最大应用数限制为30个，创建应用次数不可超过30*3/月