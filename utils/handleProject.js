// 对父子级课程的处理函数
const handleProject = (items) => {
  //1.将pname去重
  const t1 = items.map(a => a.pname)
  const pnames = [...new Set(t1)]
  // 最终需要的数组
  let result = []
  let firstMap = { pname: '', children: [] }
  let firstChildrenList = []
  let firstChildrenMap = { sid: '', name: '', bgColor: '', clickNum: '' }
  pnames.forEach(p => {
    firstMap.pname = p
    items.forEach(item => {
      if (p === item.pname) {
        firstChildrenMap.sid = item.sid
        firstChildrenMap.name = item.name
        firstChildrenMap.bgColor = item.bgColor
        firstChildrenMap.clickNum = item.clickNum
        firstChildrenList.push(firstChildrenMap)
      }
      firstChildrenMap = { sid: '', name: '', bgColor: '', clickNum: '' }
    })
    firstMap.children = firstChildrenList
    firstChildrenList = []
    result.push(firstMap)
    firstMap = { pname: '', children: [] }
  })
  return result
}


module.exports = { handleProject }
