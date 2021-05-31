import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'
import Message from '../../src/components/Message.vue'

describe('Componente App', () => {
  let comp, handleMessageClickSpy

  beforeEach(() => {
    handleMessageClickSpy = jest.spyOn(App.methods, 'handleMessageClick')
    comp = mount(App, {
      data: () => {
        return {
          messages: ['Cat']
        }
      }
    })
    // cmp = shallowMount(App)
    // cmp.setData({ messages: ['Cat'] })
  })

  it('manejar cuando @message-click pasa', async () => {
    await comp.findComponent(Message).vm.$emit('message-clicked', 'Cat')
    console.log(comp.html())
    expect(handleMessageClickSpy).toHaveBeenCalledWith('Cat')
  })

  it('Contiene un elemento', () => {
    expect(comp.findAll('li').length).toBe(1)
    expect(comp.findAll('li')[0].text()).toMatch('Cat')
  })

  it('equals message to ["cat"]', () => {
    expect(comp.vm.messages).toEqual(['Cat'])
  })

  it('MessageList contiene un Message', () => {
    expect(comp.findAllComponents(Message)).toHaveLength(1)
  })
})
