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

// 根据传入的bid删除其下所有的子章节
const getAllbids = (bid, items) => {
  // 最终需要删除的全部bid
  let all_bids = []
  // 保存一级bid
  const bids1 = []
  // 保存二级bid
  const bids2 = []
  // 先查找一级的bid
  items.forEach(a => {
    if (a.pid === bid) {
      bids1.push(a.bid)
    }
  })
  // 再继续往下查找二级的bid
  if (bids1.length > 0) {
    items.forEach(b => {
      bids1.forEach(c => {
        if (c === b.pid) {
          bids2.push(b.bid)
        }
      })
    })
  }
  // 所有的bids
  all_bids = [bid, ...bids1, ...bids2]
  return all_bids
}

module.exports = { handleChapter, getAllbids }
