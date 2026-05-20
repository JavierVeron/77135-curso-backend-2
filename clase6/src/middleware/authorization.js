export const authorization = (role) => {
    return async (req, res, next) => {        
        if (!req.user) return res.status(401).send({status:"error", message:"Sin Autorización!"});
        if (req.user.role != role) return res.status(403).send({status:"error", message:"No tienes permisos para acceder a esta Sección!"});

        next();
    }
}