import { UseFormRegisterReturn } from 'react-hook-form'

/**
 * テキスト入力フィールド
 * @param register react-hook-formのregister
 * @param placeholder 後ろに薄く見えるテキスト
 */
const TextInputField = ({
	register,
	placeholder,
	type,
	...props
}: {
	register: UseFormRegisterReturn
	placeholder: string
	type: string
	props?: any
}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className="input input-bordered w-full pr-10"
			{...register}
			{...props}
		/>
	)
}

export default TextInputField
