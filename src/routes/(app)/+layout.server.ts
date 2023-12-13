export const load: ({ locals }: { locals: any }) => Promise<{ member: any }> = async ({
	locals
}) => {
	return {
		member: locals.member
	};
};
