import Vue, { h } from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import MessageList from '../../src/components/MessageList.vue'
import Message from '../../src/components/Message.vue'

describe('Message list test', () => {
  let comp
  // , handleMessageClickSpy
  beforeEach(() => {
    // handleMessageClickSpy = jest.spyOn(MessageList.methods, 'handleMessageClick')
    // comp = mount(MessageList, {
    //   props: {
    //     messages: ['Cat']
    //   }
    // })
    // const messageWrapper = {
    //   render (h) {
    //     return h(Message, { props: { message: 'Cat' } })
    //   }
    // }
    comp = mount(MessageList, {
      slots: {
        default: h(Message, { props: { message: 'Cat' } })
      }
    })
  })

  it('El texto del Header slot tiene texto por default', () => {
    const header = comp.find('.list-header')
    expect(header.text().trim()).toBe('Default slot')
  })

  it('El componente hace render con list-header', async () => {
    const component = mount(MessageList, {
      slots: {
        header: '<div>Un header</div>'
      }
    })

    const header = component.find('.list-header')
    expect(header.text().trim()).toBe('Un header')
  })
  // it('ha recibido un ["Cat"] como propiedad', () => {
  //   expect(comp.vm.messages).toEqual(['Cat'])
  // })
})
