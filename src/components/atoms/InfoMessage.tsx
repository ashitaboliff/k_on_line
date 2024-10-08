import IconFactory from '@/svg/IconFactory'
import { ReactNode } from 'react'

type Message = {
	messageType: 'info' | 'success' | 'error' | 'warning'
	message: string | ReactNode
	IconColor: string
}

/**
 * メッセージを表示するためのコンポーネント
 * @param messageType メッセージの種類
 * @param message メッセージの内容
 * @param IconColor アイコンの色
 */
const InfoMessage = ({ messageType, message, IconColor }: Message) => {
	return (
		<div className={`alert alert-${messageType} w-80`}>
			{IconFactory.getIcon({ color: IconColor, type: messageType })}
			<span className="text-sm text-text-light">{message}</span>
		</div>
	)
}

export default InfoMessage
