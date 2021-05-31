import { shallowMount } from '@vue/test-utils'
import Form from '../../src/components/Form.vue'

describe('Form test', () => {
  let comp

  describe('Properties', () => {
    beforeEach(() => {
      comp = shallowMount(Form)
      jest.resetModules()
      jest.clearAllMocks()
    })

    it('regresa la cadena en orden normal si la propiedad reversed no es true', () => {
      comp.setData({ inputValue: 'Yoo' })
      expect(comp.vm.reversedInput).toBe('Yoo')
    })

    it('Retorna la cadena al revez si la propiedad es true', async () => {
      await comp.setData({ inputValue: 'Yoo' })
      await comp.setProps({ reversed: true })
      expect(comp.vm.reversedInput).toBe('ooY')
    })
  })

  describe('Watchers', () => {
    let consoleSpy
    afterEach(() => {
      consoleSpy.mockClear()
    })

    beforeAll(() => {
      consoleSpy = jest.spyOn(global.console, 'log')
    })

    it('es llamado cuando tiene nuevos valores', async () => {
      comp.vm.inputValue = 'coso'
      comp.vm.$nextTick(() => {
        expect(consoleSpy).toBeCalled()
      })
    })

    it('Llamado cuando tiene nuevos valores', async () => {
      await comp.setData({ inputValue: 'foo' })
      expect(consoleSpy).toBeCalled()
    })

    it('No se llama si el valor es vacio (por trim)', async () => {
      await comp.setData({ inputValue: '   ' })
      expect(consoleSpy).not.toBeCalled()
    })

    it('No es llamado si tiene los mismos valores', () => {
      comp = shallowMount(Form, {
        data: () => ({ inputValue: 'foo' })
      })
      comp.setData({ inputValue: 'foo' })
      expect(consoleSpy).not.toBeCalled()
    })
  })

  describe('Dependencies', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ title: 'hola' })
      }))

    it('llama a fetch', async () => {
      const results = await comp.vm.onSubmit('an')
      expect(results).toEqual({ title: 'hola' })
      expect(comp.vm.results).toEqual({ title: 'hola' })
      expect(fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts?q=an')
    })
  })
})
