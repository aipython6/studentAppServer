// 课本--一级章节--二级章节的处理
const handleChapter = (items) => {
  const treeData = []
  let resultMap = { id: '', label: '', children: [] }
  let resuleMapChidlren = []

  let secondMap = { id: '', label: '', pid: '', children: [] }
  let secondMapChildren = []

  let thirdMap = { id: '', pid: '', label: '' }
  items.forEach(a => {
    if (!a.pid) {
      resultMap.id = a.bid
      resultMap.label = a.name
      items.forEach(b => {
        if (b.pid === a.bid) {
          secondMap.id = b.bid
          secondMap.pid = b.pid
          secondMap.label = b.name
          items.forEach(c => {
            if (c.pid === b.bid) {
              thirdMap.id = c.bid
              thirdMap.pid = c.pid
              thirdMap.label = c.name
              secondMapChildren.push(thirdMap)
            }
            thirdMap = { id: '', pid: '', label: '' }
          })
          secondMap.children = secondMapChildren
          resuleMapChidlren.push(secondMap)
          secondMapChildren = []
        }
        secondMap = { id: '', label: '', pid: '', children: [] }
      })
      resultMap.children = resuleMapChidlren
      treeData.push(resultMap)
      resuleMapChidlren = []
    }
    resultMap = { id: '', label: '', children: [] }
  });
  return treeData
}

module.exports = { handleChapter }
