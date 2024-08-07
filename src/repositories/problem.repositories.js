const NotFound = require('../errors/notfound.error');
const { Problem }=require('../models/index');
const logger=require('../config/logger.config');

class ProblemRepository{
    async createProblem(problemData){
        try{
            const problem=await Problem.create({
                title:problemData.title,
                description:problemData.description,
                testCases:problemData.testCases,
                codeStubs:problemData.codeStubs,
                difficulty:problemData.difficulty

            });
            return problem;//after making the proble return the proble
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    async getAllProblems(){
        try{
            const problems=await Problem.find({});
            return problems;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async getProblem(id){
        try{
            const problem=await Problem.findById(id);
            if(!problem){
                throw new NotFound("problem",id);
            }
            return problem;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async deleteProblem(id){
        try{
            const problem=await Problem.findByIdAndDelete(id);
            if(!problem){
                logger.error(`Problem.Repository:problem with id: ${id} not found in the db`);
            }
            return problem;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

}
module.exports=ProblemRepository;

