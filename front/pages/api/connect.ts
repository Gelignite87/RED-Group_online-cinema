// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	name: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	//http://localhost:3000/api/connect?prof=programmer, with body {"age":23}
	const { prof } = req.query
	const { age } = req.body
	res.status(200).json({ name: `John Doe: ${prof}, ${age} years old` })
}
