# 服务测试方法

### 测试单元参数： TestUnit

> props: any[] 服务参数列表

> eventPropsList: {[key:string]:any} 事件参数列表

> 服务事件保证单一参数（复合数据通过对象传递）

```Typescript
const unit = new TestUnit(Service)
unit.props = ['prop1','prop2']
unit.eventPropsList = ['default',{name:'',password:''}]
```

### 生成测试组件

> 不同方法生成的测试组件，只有一个

> 单一组件 -> getCompo

> 嵌套组件 -> getCompoNested

> 嵌套分形组件 -> getCompoMapping

> 通过 xxx-layer-index 访问服务内容

```Typescript
const compo = getCompo(unit)
const nestedCompo = getCompoNested(unit,unit1,unit2)
const mappingCompo = getCompoMapping({unit:unit,chldren:[
    {unit:unit10},
    {unit:unit11, children:[
        {unit:unit20}
    ]}
]})

const nestedWrapper = mount(nestedCompo)
checkValue(nestedWrapper,'value-1')
await triggerEvent(nestedWrapper,'event-2')

// xxx-layer-index
const mappingWrapper = mount(mappingCompo)
checkValue(nestedWrapper,'value-1-0')
await triggerEvent(nestedWrapper,'event-2-2')
```

### 默认 changeValue 事件

```Typescript
unit.eventPropsList['setValue'] = {
    // key path to the service value
    keyPath:['name','value']
    // value to change
    value:'new value'
}
// same to use xxx-layer-index to trigger
await triggerEvent(wrapper,'setValue-2-3')
```

### 只用考虑服务关系 —— 单一，嵌套，分形

你只需要考虑服务间的关系，而不需要考虑组件间的关系

数据 ref ，到组件一级会如何使用，不在开发的考虑范围内

只需要保证测试覆盖，保证功能完备即可

### 补充 vue-injection-helper 使用

核心 api 只有三个：

```Typescript
defineModule(localService, innerToken, outSource)
aggregationRef(token, [...keyPath], defaultValue)
aggregationEvent(token, [...eventKeyPath])
```

defineModule —— 让本服务生成一个领域模块，其后的服务可以通过 token（id）进行访问

并获得完整控制权

aggregationRef —— 获得模块核心领域数据，以及其控制权，采用 actor 模型进行变更（watch）

aggregationEvent —— 获得领域事件

不要显式地出现 inject， provide，只采用 token，这样能把注意力集中在服务本身的结构上

inject/provide 是只有出现组件，才会有的技术名词

依赖注入是 DDD 的基础，但是 DDD 不需要考虑注入（注入为技术名词）
