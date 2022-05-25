// 课本--一级章节--二级章节的处理
const handleChapter = (items) => {
  const treeData = []
  let resultMap = { id: '', label: '', type: '', children: [] }
  let resuleMapChidlren = []

  let secondMap = { id: '', label: '', pid: '', type: '', children: [] }
  let secondMapChildren = []

  let thirdMap = { id: '', pid: '', label: '', type: '' }
  items.forEach(a => {
    if (!a.pid) {
      resultMap.id = a.bid
      resultMap.label = a.name
      resultMap.type = a.type
      items.forEach(b => {
        if (b.pid === a.bid) {
          secondMap.id = b.bid
          secondMap.pid = b.pid
          secondMap.label = b.name
          secondMap.type = b.type
          items.forEach(c => {
            if (c.pid === b.bid) {
              thirdMap.id = c.bid
              thirdMap.pid = c.pid
              thirdMap.label = c.name
              thirdMap.type = c.type
              secondMapChildren.push(thirdMap)
            }
            thirdMap = { id: '', pid: '', label: '', type: '' }
          })
          secondMap.children = secondMapChildren
          resuleMapChidlren.push(secondMap)
          secondMapChildren = []
        }
        secondMap = { id: '', label: '', pid: '', type: '', children: [] }
      })
      resultMap.children = resuleMapChidlren
      treeData.push(resultMap)
      resuleMapChidlren = []
    }
    resultMap = { id: '', label: '', type: '', children: [] }
  });
  return treeData
}

module.exports = { handleChapter }
