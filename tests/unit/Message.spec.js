import { mount } from '@vue/test-utils'
import Message from '../../src/components/Message.vue'

const createComp = props => mount(Message, { props })

describe('Componente Message de vue', () => {
  // ----------------- PARA VALIDAR CONSOLAS --------------
  // it('Contiene nickname y es valido', () => {
  //   const spy = jest.spyOn(global.console, 'warn')
  //   createComp({ message: 'hola mundo' })
  //   expect(spy).toHaveBeenCalledWith(
  //     expect.stringMatching(new RegExp('Vue warn]: Missing required prop: "nickname"')),
  //   )
  //   spy.mockReset()
  // })

  describe('validadores', () => {
    const comp = createComp({ message: 'hola' })
    const nicknameProp = comp.vm.$options.props.nickname
    it('Tiene una propiedad nickname obligatoria', () => {
      expect(nicknameProp.required).toBeTruthy()
    })

    it('Es de tipo string', () => {
      expect(nicknameProp.type).toBe(String)
    })

    it('Un nicname mayor a 4', () => {
      expect(nicknameProp.validator && nicknameProp.validator('a')).toBeFalsy()
      expect(nicknameProp.validator && nicknameProp.validator('aaaaa')).toBeTruthy()
    })
  })

  describe('Eventos', () => {
    let comp
    beforeEach(() => {
      comp = createComp({ message: 'Hola', nickname: 'Pedro' })
    })

    it('verificamos que message-clicked se emitio', () => {
      comp.find('.message').trigger('click')
      expect(comp.emitted()).toHaveProperty('message-clicked')
    })

    it('verificamos que handleClick se ejecute', () => {
      const spy = jest.spyOn(comp.vm, 'handleClick')
      comp.find('.message').trigger('click')
      expect(spy).toBeCalled()
    })
  })

  it('tiene una propiedad mensajes', () => {
    const comp = createComp({ message: 'hola' })
    expect(comp.props('message')).toEqual('hola')
  })

  it('Contiene la propiedad author', () => {
    const comp = createComp({ message: 'Un texto largo' })
    expect(comp.vm).toHaveProperty('author')
  })
})
