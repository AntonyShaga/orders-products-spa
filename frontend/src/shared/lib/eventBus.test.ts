import { eventBus, EventMap } from './eventBus'

describe('eventBus', () => {
  afterEach(() => {
    eventBus.off('TOAST_SHOW', handler1)
    eventBus.off('TOAST_SHOW', handler2)
  })

  const payload: EventMap['TOAST_SHOW'] = {
    message: 'test',
    type: 'success',
  }

  const handler1 = jest.fn<void, [EventMap['TOAST_SHOW']]>()
  const handler2 = jest.fn<void, [EventMap['TOAST_SHOW']]>()

  it('calls handler on emit', () => {
    eventBus.on('TOAST_SHOW', handler1)

    eventBus.emit('TOAST_SHOW', payload)

    expect(handler1).toHaveBeenCalledWith(payload)
  })

  it('does not call handler after off', () => {
    eventBus.on('TOAST_SHOW', handler1)
    eventBus.off('TOAST_SHOW', handler1)

    eventBus.emit('TOAST_SHOW', payload)

    expect(handler1).not.toHaveBeenCalled()
  })

  it('calls multiple handlers', () => {
    eventBus.on('TOAST_SHOW', handler1)
    eventBus.on('TOAST_SHOW', handler2)

    eventBus.emit('TOAST_SHOW', payload)

    expect(handler1).toHaveBeenCalledTimes(1)
    expect(handler2).toHaveBeenCalledTimes(1)
  })

  it('passes correct payload type', () => {
    eventBus.on('TOAST_SHOW', handler1)

    eventBus.emit('TOAST_SHOW', payload)

    const callArg = handler1.mock.calls[0][0]

    expect(callArg.message).toBe('test')
    expect(callArg.type).toBe('success')
  })
})
