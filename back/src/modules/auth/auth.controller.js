import { AuthService } from './auth.service.js'

export const AuthController = {
  async login(req, res) {
    const body = req.body
    try {
      const result = await AuthService.login(body)
      res.status(200).json(result)
    } catch (error) {
      console.error('Ошибка в AuthController:', error)
      res.status(500).json({ error: 'Ошибка в AuthController:' })
    }
  },
  async getNewTokens(req, res) {
    const dto = req.body
    try {
      const result = await AuthService.getNewTokens(dto)
      res.status(200).json(result)
    } catch (error) {
      console.error('Ошибка в AuthController:', error)
      res.status(500).json({ error: 'Ошибка в AuthController:' })
    }
  },
  async register(req, res) {
    const dto = req.body
    try {
      const result = await AuthService.register(dto)
      res.status(200).json(result)
    } catch (error) {
      console.error('Ошибка в AuthController:', error)
      res.status(500).json({ error: 'Ошибка в AuthController:' })
    }
  },
}
