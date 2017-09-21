function treeHanlde(arr) {
    treeData: [{
      label: '天津中审联',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1',
          children: [{
            label: 1
          }, {
            label: 2
          }]
        }]
      }]
    }]
    let obj = {
       label: '天津中审联',
       children: []
    }
    // 二级
    arr.forEach((item, index) => {
      obj.children.push({
          label: item.name,
          children: item.departmentArray
      })
    })
    // 其他
    obj.children.forEach((item, index) => {
      item.children.forEach((jtem) => {
        jtem.label = jtem.name
        jtem.children = jtem.projectDepartmentArray
        jtem.children.forEach((ktem) => {
          ktem.label = ktem.name
          ktem.children = ktem.groupArray
          ktem.children.forEach((mtem) => {
            mtem.label = mtem.name
          })
        })
      })
    })
    return [obj]
}

export default treeHanlde